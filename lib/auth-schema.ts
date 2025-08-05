import { z } from "zod";

const schema = z.object({
  name: z.string().
          min(3, {message: "Name must be at least 3 characters"}).
          max(50, {message: "Name cannot be longer than 50 characters"}),

  email: z.string().
          email({message: "Invalid email entered"}).
          min(3, {message: "Email must be at least 3 characters"}).
          max(50, {message: "Email cannot be longer than 50 characters"}),
  
  password: z.string(). 
              min(6, {message: "Password must be at least 6 characters"}). 
              max(50, {message: "Password cannot be longer than 50 characters"}),

  rememberMe: z.boolean().default(false).optional()
})

export const signUpFormSchema = schema.pick({
  name: true,
  email: true,
  password: true,
})

export const signInFormSchema = schema.pick({
  email: true,
  password: true,
  rememberMe: true,
})
