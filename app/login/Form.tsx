"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await signIn("credentials", { 
        redirect: false,
        username: "Joseph",
        password: "12345678",
        email: "joseph@example.com",
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <button
        onClick={handleLogin}
        className='mb-3 py-2 px-4 bg-slate-900 text-white shadow-md text-2xl font-semibold'
      >
        Login
      </button>
    </main>
  );
}
