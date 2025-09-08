import SignInForm from "@/components/auth/sign-in-form";
import { auth } from "@/lib/auth/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Sign in',
};

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if(!session){
    return(
      <SignInForm />
    )
  } else{
    redirect("/dashboard") // redirect to dash if they are logged in
  }
}
