import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

async function getUserRoleFromDatabase(email) {
  if (email === process.env.ADMIN_MAIL) {
    // todo!
    return "Admin";
  }
  return "Viewer";
}

const fakeLogin = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "artist" },
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

const providers =
  process.env.VERCEL_ENV === "preview"
    ? [fakeLogin]
    : [
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
      ];

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
