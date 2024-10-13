import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={`/`}>
      <Image
        className="mx-auto aspect-[4/4]"
        priority={true}
        src={'/img/logo.png'}
        alt="saba-art"
        width={300}
        height={300}
      />
    </Link>
  );
}
