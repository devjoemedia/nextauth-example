'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession();

  const user = session?.user;

  const handleLogout =async()=>{
    await signOut({ redirect: false, callbackUrl: "/login" });
    router.push("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
       <h2 className="mb-3 text-2xl font-semibold">
          Welcome: {user?.name} 
        </h2>
      <button onClick={handleLogout} className='mb-3 py-2 px-4 bg-slate-900 text-white shadow-md text-2xl font-semibold'>Logout</button>
    </main>
  );
}
