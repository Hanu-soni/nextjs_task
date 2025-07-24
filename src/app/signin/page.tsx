"use client";

import { getSession, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignIn() {
   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = async () => {
  
  let response=  await signIn("credentials", {
      email,
      password,
      redirect:false
    });


   if(response?.ok){
     if(email==='admin101@gmail.com'){
      sessionStorage.setItem('role','admin');
      router.push('/dashboards')
      toast.success('logged in success')
    }
    else{   
      router.push('/dashboards')
      sessionStorage.setItem('role','user');   
    }
   }
    //console.log(session,".......18")
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex gap-2 justify-center">
        <Button onClick={handleCredentialsLogin}>Login</Button>
      <Button onClick={() => signIn("github")}>Login with GitHub</Button>
      <Button onClick={() => signIn("google")}>Login with Google</Button>
      </div>
    </div>
  );
}
