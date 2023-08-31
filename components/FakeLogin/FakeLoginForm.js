import { signIn } from "next-auth/react";

export default function FakeloginFrom() {
  async function handleFakeLogin(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const username = data.username;
    const password = data.password;
  }

  return (
    <form onSubmit={handleFakeLogin}>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
