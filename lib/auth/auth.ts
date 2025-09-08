import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, apiKey } from 'better-auth/plugins';
import { sendEmail } from "./email";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    disableSignUp: process.env.REGISTRATION_ALLOWED === "disabled",
    minPasswordLength: 6,
    maxPasswordLength: 50,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationURL = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.BETTER_AUTH_URL}/dashboard`
      await sendEmail({
        recipient: user.email,
        subject: "Email verification",
        body: `Please click this link to verify your email ${verificationURL}. This link lasts for 1 hour`
      })
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 60, // Expires in 60 days
    updateAge: 60 * 60 * 24       // Updates every 1 day with new expiry
  },

  plugins: [
    nextCookies(),
    apiKey(),
    admin()
  ]
} satisfies BetterAuthOptions);

