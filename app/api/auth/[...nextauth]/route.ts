import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "@/data/users.json";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );
        return user ? { id: user.id, name: user.name, email: user.email } : null;
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
