import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Keypair } from "@solana/web3.js";
import db from "@/app/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) return false;

        const existingUser = await db.user.findFirst({
          where: { username: email },
        });

        if (!existingUser) {
          const keypair = Keypair.generate();
          const publicKey = keypair.publicKey.toBase58();
          const privateKey = keypair.secretKey;

          console.log("✅ Creating new user:", email);
          console.log("🔑 Public Key:", publicKey);

          await db.user.create({
            data: {
              username: email,
              provider: "Google",
              solanaWallet: {
                create: {
                  publicKey,
                  privateKey: privateKey.toString(),
                },
              },
              inrWallet: {
                create: {
                  balance: "0",
                },
              },
            },
          });
        } else {
          console.log("👤 User already exists:", email);
        }

        return true;
      }

      return false;
    },
  },
});

export { handler as GET, handler as POST };
