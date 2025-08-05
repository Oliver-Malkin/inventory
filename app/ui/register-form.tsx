'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "@/lib/auth-schema";
import { Metadata } from "next";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegistrationForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const promiseSignUp = new Promise<void>((resolve, reject) => {
      const { name, email, password } = values;
      authClient.signUp.email({
        name,
        email,
        password,
      }, {
        onSuccess: async () => {
          form.reset()
          resolve() // Resolve the promise
          router.replace('/sign-in')
        },

        onError: (ctx) => {
          form.reset()
          reject(ctx.error.message) // Reject the promise
        }
      })
    })

    toast.promise(promiseSignUp,
      {
        pending: "Creating account...",
        success: "Account created",
        error: {
          render({ data }) {
            return `${data}`
          }
        }
      }
    )
  }

  return (
    <Card className="w-full max-w-[100%] md:max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Please enter your details to create an account</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-Blue hover:bg-Blue-Dark" type="submit">Register</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="w-full justify-center items-center">
        <p>Minecraft server manager</p>
      </CardFooter>
    </Card>
  )
}
