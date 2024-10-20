import Button from '@/Button/Button';

export default function KontaktFormular() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const formData = Object.fromEntries(data);
    console.log(formData);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 my-4 mx-auto max-w-lg"
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
        required
      />
      <label htmlFor="email">E-Mail:</label>
      <input
        className="w-auto border-b border-tertiary-color bg-primary-color"
        type="text"
        id="email"
        name="email"
        minLength={3}
        maxLength={100}
        autoComplete="email"
        required
      />
      <label htmlFor="message" className="sr-only"></label>
      <textarea
        className="rounded-lg border border-tertiary-color bg-primary-color p-2 text-font-color outline-none"
        name="message"
        maxLength={500}
        id="message"
        cols={30}
        rows={5}
      ></textarea>
      <Button variant="main" size="base">
        Versenden
      </Button>
    </form>
  );
}
