import { apiKey } from "better-auth/plugins";
import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    apiKey(),
    adminClient()
  ]
})

export const {
  signIn,
  signOut,
  signUp,
  useSession
} = authClient;

