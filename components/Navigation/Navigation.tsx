import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import AdminNavigation from './AdminNavigation';

type NavigationItems = { href: string; label: string }[];

const navItems: NavigationItems = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/press', label: 'Presse' },
  { href: '/contact', label: 'Kontakt' },
];

export default function Navigation() {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();

  return (
    <nav className="border-b border-secondary-color bg-primary-color">
      <ul className="flex items-center justify-between text-xl">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${router.pathname === item.href ? ' bg-secondary-color ' : ''}ease block px-3 py-2 transition-colors duration-200 hover:bg-secondary-color`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {session && session.user?.role === 'Admin' && (
          <AdminNavigation
            toggle={toggle}
            onToggle={() => setToggle(!toggle)}
          />
        )}
      </ul>
    </nav>
  );
}
