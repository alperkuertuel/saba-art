import '../styles/global.css';

import { useState } from 'react';

import Button from '@/Button/Button';

export default function KontaktFormular() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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
      setFormData({ name: '', email: '', message: '' });
    } catch (error_) {
      console.error(error_);
      setError('Es ist etwas schief gelaufen. Probiere es später noch einmal.');
      setSuccess(false);
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
    <form
      className="mx-auto my-4 flex max-w-lg flex-col gap-2"
      onSubmit={handleSubmit}
    >
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
        className="my-4 rounded-lg border border-tertiary-color bg-primary-color p-2 text-font-color outline-none"
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
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {success && (
        <p className="mt-2 text-emerald-600">
          Deine E-Mail wurde erfolgreich versendet!
        </p>
      )}
    </form>
  );
}
