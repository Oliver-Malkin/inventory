'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { signInFormSchema } from "@/lib/auth-schema";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callbackUrl")
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password, rememberMe } = values;

    const promiseSignIn = new Promise<void>((resolve, reject) => {
      authClient.signIn.email({
        email,
        password,
        rememberMe,
      }, {
        onSuccess: () => {
          form.reset()
          router.push(callbackURL || "/dashboard",)
          resolve()
        },

        onError: (ctx) => {
          form.reset()
          reject(ctx.error.message)
        }
      })
    })

    await toast.promise(promiseSignIn,
      {
        pending: "Logging you in...",
        success: "Logged in",
        error: {
          render({ data }) {
            return `${data}`
          }
        }
      }
    )
  }

  return (
    <Card className="w-full max-w-[95%] md:max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back! Please sign in to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button className="button-submit" type="submit">Sign in</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="w-full justify-center items-center">
        <p>Minecraft server manager</p>
      </CardFooter>
    </Card>
  )
}
