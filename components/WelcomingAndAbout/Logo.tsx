import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <h1>
      <Link href={`/`}>
        <Image
          className="mx-auto my-2 aspect-[4/1]"
          priority={true}
          src={'/img/logo.png'}
          alt="saba-art"
          width={170}
          height={45}
          style={{ width: '170px', height: '45px' }}
        />
      </Link>
    </h1>
  );
}
