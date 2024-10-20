import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import AdminNavigation from './AdminNavigation';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }

  interface User {
    role?: string | null;
  }
}

type NavigationItems = { href: string; label: string }[];

const navItems: NavigationItems = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/press', label: 'Presse' },
  { href: '/contact', label: 'Kontakt' },
];

export default function Navigation({
  isDarkMode,
  handleToggleDarkMode,
}: {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
}) {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();

  return (
    <nav className="size-full border-b border-secondary-color bg-primary-color">
      <ul className="flex items-center justify-between text-xl">
        {session && session.user?.role === 'Admin' && (
          <AdminNavigation
            toggle={toggle}
            onToggle={() => setToggle(!toggle)}
          />
        )}
        {navItems.map((item) => (
          <li key={item.href} className="size-full text-center">
            <Link
              href={item.href}
              className={`${router.pathname === item.href ? ' bg-secondary-color ' : ''}ease block h-full px-3 py-2 transition-colors duration-200 hover:bg-secondary-color`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="size-full text-center">
          <button
            className="ease size-full px-3 py-2 transition-colors duration-200 hover:bg-secondary-color"
            onClick={() => handleToggleDarkMode(isDarkMode)}
          >
            {isDarkMode ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
