import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'faber.quentin@gmail.com';
        const adminPasswordHash =
          process.env.ADMIN_PASSWORD_HASH ||
          '$2b$10$vGh8EBMor6L9.L8TqpDAGu.aL9yOFTK62r2md57Ira4x7ICsd5FoC';

        console.log('Login attempt:', credentials.email);
        console.log('Expected email:', adminEmail);
        console.log('Hash exists:', !!adminPasswordHash);
        console.log('Hash value:', adminPasswordHash);
        console.log('Hash length:', adminPasswordHash?.length);
        console.log('Password received:', credentials.password);

        if (!adminPasswordHash) {
          console.error('ADMIN_PASSWORD_HASH not set in .env.local');
          return null;
        }

        if (credentials.email !== adminEmail) {
          console.log('Email mismatch');
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          adminPasswordHash
        );

        console.log('Password valid:', isValid);

        if (!isValid) {
          return null;
        }

        return {
          id: '1',
          email: adminEmail,
          name: 'Admin',
          role: 'admin',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
