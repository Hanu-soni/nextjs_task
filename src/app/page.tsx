"use client";
import { Toaster } from 'react-hot-toast';
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Welcome to the App</h1>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/signin")}>Login</Button>
        <Button onClick={() => router.push("/register")}>Sign Up</Button>
      </div>
      <Toaster position='top-right'/>
    </div>
  );
}
