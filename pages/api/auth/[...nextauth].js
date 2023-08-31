import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

async function getUserRoleFromDatabase(email) {
  if (email === "alperkuertuel@hotmail.de") {
    return "admin";
  }
  return "viewer";
}

const fakeLogin = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "fish" },
    password: { label: "Password", type: "password" },
  },
  // and adding a fake authorization with static username and password:
  async authorize(credentials) {
    if (credentials.username === "artist" && credentials.password === "art-gallery") {
      return {
        id: "1",
        name: "artist",
        email: "artist@github.com",
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
        // ...add more providers here
      ];

export const authOptions = {
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
