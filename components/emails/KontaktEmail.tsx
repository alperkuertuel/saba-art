import 'styles/global.css';

import { Heading, Tailwind } from '@react-email/components';

interface KontaktEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function KontaktEmail({
  name,
  email,
  message,
}: KontaktEmailProps) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              'font-color': 'var(--font-color)',
              'primary-color': 'var(--primary-color)',
              'secondary-color': 'var(--secondary-color)',
              'tertiary-color': 'var(--tertiary-color)',
              'cool-color': 'var(--cool-color)',
              'box-color': 'var(--box-color)',
            },
            boxShadow: {
              'box-style':
                '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
            },
          },
        },
      }}
    >
      <Heading
        as="h1"
        className="m-0 mt-[8px] text-[24px] font-semibold leading-[36px] text-gray-900"
      >
        <a href={`mailto:${email}`}>{name}</a> sagt:
      </Heading>
      <p className="text-[16px] leading-[24px] text-gray-500">
        <q>{message}</q>
      </p>
      <p>
        Schicke deine Antwort an: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <a href="https://www.saba-art.com">saba-art.com</a>
    </Tailwind>
  );
}
