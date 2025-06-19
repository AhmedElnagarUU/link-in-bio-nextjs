import NextAuth, { DefaultSession, User as NextAuthUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

interface User extends NextAuthUser {
  id: string;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const client = await clientPromise;
        const db = client.db("linkinbio");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id.toString(), name: user.name, email: user.email };
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };