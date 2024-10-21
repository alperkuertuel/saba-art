import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import Button from '@/Button/Button';

export interface KontaktFormularProperties {
  name: string;
  email: string;
  message: string;
}

export default function KontaktFormular() {
  const [formData, setFormData] = useState<KontaktFormularProperties>({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      setSuccess(true);
      setError(null);
    } catch (error_) {
      console.error(error_);
      setSuccess(false);
      setError('Es ist etwas schief gelaufen. Probiere es später noch einmal.');
    } finally {
      setIsLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon
          icon={faEnvelope}
          className="my-6 flex w-full animate-bounce justify-center text-3xl"
        />
      ) : (
        <form
          className="mx-auto my-4 flex max-w-lg flex-col gap-2"
          onSubmit={handleSubmit}
        >
          {error && <p className="mt-2 text-rose-700">{error}</p>}
          {success && (
            <p className="mt-2 text-center text-emerald-700">
              Deine E-Mail wurde erfolgreich versendet!
            </p>
          )}
          <label htmlFor="name">Name:</label>
          <input
            className="w-auto border-b border-tertiary-color bg-primary-color"
            type="text"
            id="name"
            name="name"
            minLength={3}
            maxLength={100}
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">E-Mail:</label>
          <input
            className="w-auto border-b border-tertiary-color bg-primary-color"
            type="email"
            id="email"
            name="email"
            minLength={3}
            maxLength={100}
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            className="my-2 rounded-lg border border-tertiary-color bg-primary-color p-2 text-font-color outline-none"
            name="message"
            maxLength={500}
            id="message"
            cols={30}
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button variant="main" size="base" type="submit">
            Versenden
          </Button>
        </form>
      )}
    </>
  );
}
