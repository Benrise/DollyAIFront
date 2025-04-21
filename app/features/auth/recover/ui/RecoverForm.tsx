"use client"

import NextLink from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Steps } from 'antd'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Lock, ArrowLeft } from 'lucide-react'

import { useRecoverMutation } from '../hooks'
import { useMobileDetect } from '@/app/shared/hooks'
import {
  TypeSendCodeSchema,
  VerifyCodeSchema,
  ChangePasswordSchema,
  SendCodeSchema,
  TypeChangePasswordSchema,
  TypeVerifyCodeSchema
} from '@/app/entities/auth'
import { Separator } from "@/app/shared/ui/separator"
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
import { H2 } from '@/app/shared/ui/typography'

export function RecoverForm() {
  const OAUTH_LINK = process.env.NEXT_OAUTH_LINK || "#"
  const LOGIN_URL = "/pages/auth/login"

  const { 
    sendCodeMutation, 
    verifyCodeMutation, 
    changePasswordMutation, 
    isLoadingSendCode, 
    isLoadingVerifyCode, 
    isLoadingChangePassword
  } = useRecoverMutation(
    () => sendCodeCallback(),
    () => verifyCodeCallback(),
    () => changePasswordCallback()
  )
  
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const { isMobile } = useMobileDetect()

  const sendCodeForm = useForm<TypeSendCodeSchema>({
    resolver: zodResolver(SendCodeSchema),
  })
  
  const verifyCodeForm = useForm<TypeVerifyCodeSchema>({
    resolver: zodResolver(VerifyCodeSchema),
  })
  
  const changePasswordForm = useForm<TypeChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSendCode = async (data: TypeSendCodeSchema) => {
    sendCodeMutation(data)
  }

  const sendCodeCallback = () => {
    sendCodeForm.reset()
    setCurrentStep(1)
  }

  const onVerifyCode = async (data: TypeVerifyCodeSchema) => {
    verifyCodeMutation({ code: data.code })
  }

  const verifyCodeCallback = () => {
    verifyCodeForm.reset()
    setCurrentStep(2)
  }

  const onChangePassword = async (data: TypeChangePasswordSchema) => {
    changePasswordMutation({
      password: data.password, 
      password_confirm: data.password_confirm
    })
  }

  const changePasswordCallback = () => {
    changePasswordForm.reset()
    router.push(LOGIN_URL)
  }

  const steps = [
    { title: 'Enter Email' },
    { title: 'Verify Code' },
    { title: 'New Password' },
  ]

  return (
    <div className="flex px-4 sm:px-10 flex-col gap-8 h-fit sm:min-h-fit">
        <H2 className="w-full text-center">
            Recover Password
        </H2>
        <Steps
            responsive={false}
            type={isMobile ? 'inline' : 'default'}
            className={`mb-4 ${isMobile ? 'justify-center' : ''}`}
            size="small"
            current={currentStep}
            items={steps.map(item => ({ title: item.title }))}
        />
        {currentStep === 0 && (
            <Form {...sendCodeForm}>
            <form 
                onSubmit={sendCodeForm.handleSubmit(onSendCode)} 
                className="flex flex-col gap-12"
            >
                <FormField
                control={sendCodeForm.control}
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
                
                <div className="flex flex-col items-center">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isLoadingSendCode}
                    >
                        {isLoadingSendCode ? "Sending..." : "Send Code"}
                    </Button>
                    <Button variant="link" size={"lg"} className="text-foreground" asChild>
                        <NextLink href={LOGIN_URL}>
                            Back to Login Page
                        </NextLink>
                    </Button>
                </div>
            </form>
            </Form>
        )}
        {currentStep === 1 && (
            <Form {...verifyCodeForm}>
            <form
                onSubmit={verifyCodeForm.handleSubmit(onVerifyCode)}
                className="flex flex-col gap-12"
            >
                <FormField
                control={verifyCodeForm.control}
                name="code"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        maxLength={6}
                        placeholder="Enter verification code"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                
                <div className="flex flex-col gap-3">
                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoadingVerifyCode}
                >
                    {isLoadingVerifyCode ? "Verifying..." : "Verify Code"}
                </Button>
                
                <Button variant="link" className="w-full" asChild>
                    <NextLink href={LOGIN_URL}>
                    Back to Login Page
                    </NextLink>
                </Button>
                </div>
            </form>
            </Form>
        )}
        {currentStep === 2 && (
            <Form {...changePasswordForm}>
            <form
                onSubmit={changePasswordForm.handleSubmit(onChangePassword)}
                className="flex flex-col gap-12"
            >
                <FormField
                control={changePasswordForm.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="password"
                            placeholder="Enter new password"
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
                control={changePasswordForm.control}
                name="password_confirm"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="password"
                            placeholder="Confirm new password"
                            className="pl-9"
                            {...field}
                        />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex flex-col gap-3">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isLoadingChangePassword}
                    >
                        {isLoadingChangePassword ? "Updating..." : "Change Password"}
                    </Button>
                    <Button variant="link" className="w-full" asChild>
                        <NextLink href={LOGIN_URL}>
                        Back to Login Page
                        </NextLink>
                    </Button>
                </div>
            </form>
            </Form>
        )}
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
  )
}