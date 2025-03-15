import { z } from 'zod';

const PASS_LOWERCASE_ERR = "Password must contain at least one lowercase letter.";
const PASS_CAPITAL_ERR = "Password must contain at least one uppercase letter.";
const PASS_DIGIT_ERR = "Password must contain at least one digit.";
const PASS_SPECIAL_SYMBOL_ERR = "Password must contain at least one special character (#$@!%&*?).";
const PASS_DONT_MATCH_ERR = "Passwords do not match.";

const emailRule = z.string()
.min(5, { message: "Email must be at least 5 characters long" })
.max(128, { message: "Email must be no longer than 128 characters" })
.email({ message: "Invalid email format" })

const passwordRule = z.string()
.min(8, { message: "Password must be at least 8 characters long" })
.regex(/[a-z]/, { message: PASS_LOWERCASE_ERR })
.regex(/[A-Z]/, { message: PASS_CAPITAL_ERR })
.regex(/\d/, { message: PASS_DIGIT_ERR })
.regex(/[#$@!%&*?]/, { message: PASS_SPECIAL_SYMBOL_ERR })

export const RegisterSchema = z.object({
  email: emailRule,
  password: passwordRule,
  password_confirm: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
}).refine((data) => data.password === data.password_confirm, {
  message: PASS_DONT_MATCH_ERR,
  path: ["password_confirm"],
});
export type TypeRegisterSchema = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
  email: emailRule,
  password: passwordRule,
});
export type TypeLoginSchema = z.infer<typeof LoginSchema>

export const SendCodeSchema = z.object({
  email: emailRule
})
export type TypeSendCodeSchema = z.infer<typeof SendCodeSchema>

export const VerifyCodeSchema = z.object({
  code: z.string().min(6, { message: "Code must be at least 6 characters long" })
})
export type TypeVerifyCodeSchema = z.infer<typeof VerifyCodeSchema>

export const ChangePasswordSchema = z.object({
  password: passwordRule,
  password_confirm: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
}).refine((data) => data.password === data.password_confirm, {
  message: PASS_DONT_MATCH_ERR,
  path: ["password_confirm"],
});
export type TypeChangePasswordSchema = z.infer<typeof ChangePasswordSchema>

export interface ILoginResponse {
  id: number,
  email: string,
  access: string,
  access_type: string
}

export interface IRegisterResponse {
  id: number,
  email: string,
  created_at: string,
  updated_at: string,
  access: string,
  access_type: string 
}

export interface IRefreshResponse {
  id: number,
  access: string,
  access_type: string
}