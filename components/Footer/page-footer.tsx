import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function FooterComponent() {
  const { data: session } = useSession();
  return (
    <footer className="text-xs fixed z-10 bottom-0 left-0 w-full items-center gap-4 p-2 bg-cool-brown">
      <ul className="flex gap-2">
        <li>
          <Link href="/imprint">Impressum</Link>
        </li>
        <li>
          <Link href="/privacy-policy">Datenschutz</Link>
        </li>
        <li>
          {session && session.user.role === "Admin" ? (
            <button className="text-secondary-color" onClick={() => signOut()} aria-label="sign out">
              &copy; saba-art 2023
            </button>
          ) : (
            <button className="text-secondary-color" onClick={() => signIn()} aria-label="sign in">
              &copy; saba-art 2023
            </button>
          )}
        </li>
      </ul>
    </footer>
  );
}
