import {
  faGear,
  faPencil,
  faPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';

type AdminNavigationItem = {
  href: string;
  icon: IconDefinition;
  label?: string;
}[];

const adminNavItems: AdminNavigationItem = [
  { href: '/admin', label: 'Add Art Pieces', icon: faPlus },
  { href: '/admin/edit', label: 'Edit Art Pieces', icon: faPencil },
];

interface AdminNavigationProperties {
  toggle: boolean;
  onToggle: () => void;
}

export default function AdminNavigation({
  toggle,
  onToggle,
}: AdminNavigationProperties) {
  const router = useRouter();
  return (
    <li className="relative">
      <button
        aria-label="Administration"
        onClick={onToggle}
        className={`${
          adminNavItems
            .map((item) => item.href === router.pathname)
            .includes(true) || toggle
            ? 'bg-secondary-color '
            : ''
        }px-3 py-2 hover:bg-secondary-color`}
      >
        <FontAwesomeIcon icon={faGear} />
      </button>
      {toggle && (
        <ul className="absolute left-0 mt-2 space-y-1 rounded bg-primary-color shadow-lg">
          {adminNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-center rounded p-2 hover:bg-secondary-color"
              >
                <FontAwesomeIcon icon={item.icon} aria-label={item.label} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
