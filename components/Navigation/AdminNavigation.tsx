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
  { href: '/admin', label: 'Hizufügen', icon: faPlus },
  { href: '/admin/edit', label: 'Bearbeiten', icon: faPencil },
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
        aria-label="open administration dropdown menue"
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
        <ul className="absolute left-0 m-2 space-y-1 rounded bg-primary-color shadow-lg">
          {adminNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-center gap-2 rounded p-2 text-base"
              >
                {item.label}
                <FontAwesomeIcon
                  icon={item.icon}
                  aria-label={item.label}
                  className="text-sm"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
