import RegistrationForm from "@/app/ui/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Register',
};

export default async function SignIn() {
  if (process.env.REGISTRATION_ALLOWED === "enabled") {
    return (
      <RegistrationForm />
    )
  } else {
    return (
      <>
        <p>Open registration not allowed</p>
        <p>Contact the system administrator</p>
      </>
    )
  }
}
