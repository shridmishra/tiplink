"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SecondaryButton } from "./components/Button";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 gap-6 text-center bg-gradient-to-br from-gray-500 to-gray-900 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Welcome to MyApp</h1>
      <p className="text-gray-600 text-lg max-w-xl">
        Your secure and fast way to manage your dashboard with Google login.
      </p>

      {session?.user ? (
        <SecondaryButton onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </SecondaryButton>
      ) : (
        <SecondaryButton onClick={() => signIn("google")}>
          Login with Google
        </SecondaryButton>
      )}
    </div>
  );
}
