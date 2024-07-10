import { getServerSession } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Form from './Form'

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Form />
    </main>
  );
}
