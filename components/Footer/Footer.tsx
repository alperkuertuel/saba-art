import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Footer() {
  const { data: session } = useSession();
  return (
    <footer className="fixed bottom-0 left-0 z-10 w-full items-center gap-4 border-t border-secondary-color bg-primary-color p-2 text-xs">
      <ul className="flex gap-2">
        <li>
          <Link href="/imprint">Impressum</Link>
        </li>
        <li>
          <Link href="/privacy-policy">Datenschutz</Link>
        </li>
        <li>
          {session && session.user.role === 'Admin' ? (
            <button
              className="text-font-color"
              onClick={() => void signOut()}
              aria-label="sign out"
            >
              &copy; saba-art 2023
            </button>
          ) : (
            <button
              className="text-font-color"
              onClick={() => void signIn()}
              aria-label="sign in"
            >
              &copy; saba-art 2023
            </button>
          )}
        </li>
      </ul>
    </footer>
  );
}
