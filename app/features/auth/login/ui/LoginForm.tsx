"use client"

import * as React from "react"
import NextLink from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Lock } from 'lucide-react'

import { Separator } from "@/app/shared/ui/separator"
import { Button } from '@/app/shared/ui/button'
import { Terms } from '@/app/entities/terms'
import { type TypeLoginSchema, LoginSchema } from '@/app/entities/auth'
import { useLoginMutation } from '@/app/features/auth/login'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/shared/ui/form'
import { Input } from '@/app/shared/ui/input'
import { H2 } from "@/app/shared/ui/typography"
import { Logo } from "@/app/shared/ui/logo"


export function LoginForm() {
  const OAUTH_LINK = process.env.NEXT_OAUTH_LINK || "#";
  const REGISTER_URL = "/pages/auth/register"
  const RECOVER_URL = "/pages/auth/recover"

  const { loginMutation, isLoadingLogin } = useLoginMutation();
  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(values: TypeLoginSchema) {
    loginMutation(values)
  }

  return (
    <div className="flex flex-col gap-8 h-fit sm:min-h-fit">
      <Logo type="compact" className="max-h-10"/>
      <H2 className="w-full text-center">
        Sign in
      </H2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 sm:px-10 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-col justify-end items-end!">
                      <div className="relative w-full">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Enter password"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                      <Button variant="link" size="sm" className="text-foreground" asChild>
                        <NextLink href={RECOVER_URL}>
                          Forgot password?
                        </NextLink>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col w-full items-center">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                disabled={isLoadingLogin}
              >
                {isLoadingLogin ? "Logging in..." : "Login"}
              </Button>
              <Button variant="link" size="sm" className="text-foreground" asChild>
                <NextLink href={REGISTER_URL}>
                  No account? Register
                </NextLink>
              </Button>
            </div>      
            <div className="flex items-center w-full max-w-full justify-center gap-4">
              <Separator className="max-w-[45%]"/>
              <span className="text-muted-foreground text-sm">
                  or
              </span>
              <Separator className="max-w-[45%]"/>
            </div>
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
          </div>
          <Terms />
        </form>
      </Form>
    </div>
  )
}