import Image from 'next/image';
import Link from 'next/link';

import ProgressBar from '@/ProgressBar/ProgressBar';

import AdminAvatar from './AdminAvatar';

interface HeaderProperties {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function Header({
  scrollPercent,
  handleSetScrollPercentage,
}: HeaderProperties) {
  return (
    <header className="fixed top-0 z-10 w-full border-b-2 bg-cool-color p-[0.2rem] text-center">
      <ProgressBar
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
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
      <AdminAvatar />
    </header>
  );
}
