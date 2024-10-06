import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import ProgressBar from "../ProgressBar/progress-bar";

declare module "next-auth" {
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

type HeaderProperties = {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
};

export default function Header({ scrollPercent, handleSetScrollPercentage }: HeaderProperties) {
  const { data: session } = useSession();
  return (
    <header className="w-full bg-cool-brown fixed top-0 p-[0.2rem] text-center z-10">
      <ProgressBar scrollPercent={scrollPercent} handleSetScrollPercentage={handleSetScrollPercentage} />
      <h1>
        <Link href={`/`}>
          <Image
            className="my-2 mx-auto aspect-[4/1]"
            priority={true}
            src={"/img/logo.png"}
            alt="saba-art"
            width={170}
            height={45}
            style={{ width: "170px", height: "45px" }}
          />
        </Link>
      </h1>
      {session && session.user?.role === "Admin" ? (
        <Link href="/admin">
          <p className="fixed text-xs right-3 top-3 flex flex-col items-center">
            <Image
              className="rounded-full"
              src={
                session.user.image ??
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAPklEQVR42u3OsQ0AAAQAMBIvm73uDtJe0KyOiWNSWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlr6eXoBiucrxq1KGkAAAAAASUVORK5CYII="
              }
              width={30}
              height={30}
              alt="user avatar"
            />
            {session.user.role}
          </p>
        </Link>
      ) : (
        <p className="text-xs fixed right-3 top-3 flex flex-col items-center">
          {session && `Hallo, ` + session.user?.name}
        </p>
      )}
    </header>
  );
}
