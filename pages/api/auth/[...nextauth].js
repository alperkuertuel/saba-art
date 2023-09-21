import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

async function getUserRoleFromDatabase(email) {
  if (email === process.env.ADMIN_MAIL || email === process.env.ADMIN_2) {
    return "Admin";
  }
  return "Viewer";
}

const fakeLogin = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {
    const fakeUser = process.env.FAKE_USER;
    const fakePassword = process.env.FAKE_PASSWORD;
    const fakeEmail = process.env.FAKE_EMAIL;
    const role = process.env.ROLE;
    if (credentials.username === fakeUser && credentials.password === fakePassword) {
      return {
        id: "1",
        name: fakeUser,
        email: fakeEmail,
        role: role,
      };
    } else {
      return null;
    }
  },
});

const providers = [
  GoogleProvider({
    clientId:
      process.env.NEXTAUTH_URL === "http://localhost:3000/"
        ? process.env.GOOGLE_ID_LOCALHOST
        : process.env.GOOGLE_ID,
    clientSecret:
      process.env.NEXTAUTH_URL === "http://localhost:3000/"
        ? process.env.GOOGLE_SECRET_LOCALHOST
        : process.env.GOOGLE_SECRET,
  }),
];

if (process.env.VERCEL_ENV === "preview") {
  providers.push(fakeLogin);
}

export const authOptions = {
  secret: process.env.JWT_SECRET,
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // only gets called once when logging in!
        token.role = await getUserRoleFromDatabase(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
export default NextAuth(authOptions);
