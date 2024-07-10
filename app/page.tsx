"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/login" });
    router.push("/login");
  };

  const createTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ id: 1, name: "clean room" }),
    });
    const data = await res.json()
    // update session on client
    await update({ ...session, custom:  11, user: {...session?.user,name: "John Doe", custom: 'user-custom'} });
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h2 className='mb-3 text-2xl font-semibold'>
        Welcome: {user?.name}:{session?.custom}
      </h2>
      <button
        onClick={createTask}
        className='mb-3 py-2 px-4 bg-slate-900 text-white shadow-md text-2xl font-semibold'
      >
        Create Task
      </button>
      <button
        onClick={handleLogout}
        className='mb-3 py-2 px-4 bg-slate-900 text-white shadow-md text-2xl font-semibold'
      >
        Logout
      </button>
    </main>
  );
}
