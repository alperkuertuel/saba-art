import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Link href={`/`}>
      <Image
        className="mx-auto aspect-[4/4]"
        priority={true}
        src={isDarkMode ? '/img/logo-dark.png' : '/img/logo.png'}
        alt="saba-art"
        width={300}
        height={300}
      />
    </Link>
  );
}
