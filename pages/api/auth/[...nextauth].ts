import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider, {
  CredentialsConfig,
} from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { Provider } from 'next-auth/providers/index';

const fakeLogin: CredentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  authorize(credentials) {
    const fakeUser = process.env.FAKE_USER;
    const fakePassword = process.env.FAKE_PASSWORD;
    const fakeEmail = process.env.FAKE_EMAIL;
    const role = process.env.ROLE;
    return credentials?.username === fakeUser &&
      credentials?.password === fakePassword
      ? {
          id: '1',
          name: fakeUser,
          email: fakeEmail,
          role: role,
        }
      : null;
  },
});

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID ?? 'google id not found',
    clientSecret: process.env.GOOGLE_SECRET ?? 'google secret not found',
  }),
];

if (process.env.VERCEL_ENV === 'preview') {
  providers.push(fakeLogin);
}

interface CustomToken extends JWT {
  role: string;
}

function getUserRoleFromDatabase(email: string) {
  if (
    email === process.env.ADMIN_MAIL ||
    email === process.env.ANOTHER_ADMIN_MAIL
  ) {
    return 'Admin';
  }
  return 'Viewer';
}

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET!,
  providers,
  callbacks: {
    jwt({ token, user }) {
      const customToken = token as CustomToken;
      if (user?.email) {
        // only gets called once when logging in!
        customToken.role = getUserRoleFromDatabase(user.email);
      }
      return customToken;
    },
    session({ session, token }) {
      const customToken = token as CustomToken;
      if (session.user) {
        session.user.role = customToken.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
