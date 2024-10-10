import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

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

export default function AdminAvatar() {
  const { data: session } = useSession();
  return (
    <>
      {session && session.user?.role === "Admin" ? (
        <Link href="/admin">
          <p className="fixed right-3 top-3 flex flex-col items-center text-xs">
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
        <p className="fixed right-3 top-3 flex flex-col items-center text-xs">
          {session && `Hallo, ` + session.user?.name}
        </p>
      )}
    </>
  );
}
