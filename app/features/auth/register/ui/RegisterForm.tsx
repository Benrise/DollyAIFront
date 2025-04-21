"use client"

import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock } from 'lucide-react'

import { Terms } from '@/app/entities/terms'
import { type TypeRegisterSchema, RegisterSchema } from '@/app/entities/auth'
import { useRegisterMutation } from '@/app/features/auth/register'
import { Button } from '@/app/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/shared/ui/form'
import { Input } from '@/app/shared/ui/input'
import { Separator } from '@/app/shared/ui/separator'
import { H2 } from '@/app/shared/ui/typography'

export function RegisterForm() {
  const OAUTH_LINK = process.env.NEXT_OAUTH_LINK || "#";
  const LOGIN_URL = "/pages/auth/login"

  const { registerMutation, isLoadingRegister } = useRegisterMutation()
  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  })

  async function onSubmit(values: TypeRegisterSchema) {
    registerMutation(values)
  }

  return (
    <div className="flex flex-col gap-8 h-fit md:min-h-fit px-4 sm:px-10">
      <H2 className="w-full text-center">
        Register
      </H2>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col gap-12 justify-between"
        >
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter your email"
                        className="pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Enter password"
                        className="pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirm"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        className="pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> 
          <div className="flex flex-col gap-4">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isLoadingRegister}
            >
              {isLoadingRegister ? "Signing Up..." : "Sign Up"}
            </Button>
            <div className="flex items-center w-full max-w-full justify-center gap-4">
              <Separator className="max-w-[45%]"/>
              <span className="text-muted-foreground text-sm">
                  or
              </span>
              <Separator className="max-w-[45%]"/>
            </div>
            <div className="flex flex-col w-full items-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                asChild
              >
                <img src="/images/svg/icons/flat-color-icons--google.svg" alt="google"/> 
                <NextLink href={OAUTH_LINK}>
                  Sign in with Google
                </NextLink>
              </Button>
              <Button size={"lg"} variant="link" className="text-foreground" asChild>
                <NextLink href={LOGIN_URL}>
                  Already have an account? Login
                </NextLink>
              </Button>
            </div>
          </div>
          <Terms />
        </form>
      </Form>
    </div>
  )
}