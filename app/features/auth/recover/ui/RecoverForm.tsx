"use client";

import { Button, Divider, Form, Input, Typography, Steps } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeSendCodeSchema, VerifyCodeSchema, ChangePasswordSchema, SendCodeSchema, TypeChangePasswordSchema, TypeVerifyCodeSchema } from '@/app/entities/auth';
import { useRecoverMutation } from '../hooks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMobileDetect } from '@/app/shared/hooks';

const { Title } = Typography;


export function RecoverForm() {
    const OAUTH_LINK = process.env.NEXT_OAUTH_LINK
    const LOGIN_URL = "/pages/auth/login"

    const { 
      sendCodeMutation, 
      verifyCodeMutation, 
      changePasswordMutation, 
      isLoadingSendCode, 
      isLoadingVerifyCode, 
      isLoadingChangePassword
    } = useRecoverMutation(() => sendCodeCallback(), () => verifyCodeCallback(), () => changePasswordCallback());
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const sendCodeForm = useForm<TypeSendCodeSchema>({
      resolver: zodResolver(SendCodeSchema),
    });
    const verifyCodeForm = useForm<TypeVerifyCodeSchema>({
      resolver: zodResolver(VerifyCodeSchema),
    });
    const changePasswordForm = useForm<TypeChangePasswordSchema>({
      resolver: zodResolver(ChangePasswordSchema),
    });
    const { isMobile } = useMobileDetect();

    const onSendCode = async (data: TypeSendCodeSchema) => {
      sendCodeMutation(data);
    };
    const sendCodeCallback = () => {
      sendCodeForm.reset();
      setCurrentStep(1);
    };
    const onVerifyCode = async (data: TypeVerifyCodeSchema) => {
      verifyCodeMutation({ code: data.code });
    };
    const verifyCodeCallback = () => {
      verifyCodeForm.reset();
      setCurrentStep(2);
    };
    const onChangePassword = async (data: TypeChangePasswordSchema) => {
      changePasswordMutation({password: data.password, password_confirm: data.password_confirm});
    };
    const changePasswordCallback = () => {
      changePasswordForm.reset();
      router.push(LOGIN_URL)
    };

    const steps = [
      {
          title: 'Enter Email',
      },
      {
          title: 'Verify Code',
      },
      {
          title: 'New Password',
      },
  ];

  return (
      <div className="flex flex-col gap-4">
          <Title level={3} className="text-center text-base sm:text-xl">
              Recover Password
          </Title>
          <Steps
              responsive={false}
              type={isMobile ? 'inline' : 'default'}
              className={`px-4! sm:px-10! mb-4! ${isMobile && 'justify-center'}`} 
              size='small' 
              current={currentStep}
              items={steps.map(item => ({ title: item.title }))}
          />
          {currentStep === 0 && (
              <Form
                  name="sendCode"
                  layout="vertical"
                  className="px-4! sm:px-10! space-y-4"
                  onFinish={sendCodeForm.handleSubmit(onSendCode)}
              >
                  <Form.Item
                      label="Email"
                      validateStatus={sendCodeForm.formState.errors.email ? "error" : ""}
                      help={sendCodeForm.formState.errors.email?.message}
                  >
                      <Controller
                          name="email"
                          control={sendCodeForm.control}
                          render={({ field }) => {
                            return <Input size="large" placeholder="Enter your email" {...field} />
                          }}
                      />
                  </Form.Item>
                  <div className='flex flex-col gap-2'>
                      <Button 
                          type="primary" 
                          size="large" 
                          htmlType="submit" 
                          loading={isLoadingSendCode} 
                          block
                      >
                          Send Code
                      </Button>
                      <Button type='link' href={LOGIN_URL} block className="px-4! sm:px-10!">
                        Back to Login Page
                       </Button>
                  </div>
              </Form>
          )}
          {currentStep === 1 && (
            (
              <Form
                  name="verifyCode"
                  layout="vertical"
                  className="px-4! sm:px-10! space-y-4"
                  onFinish={verifyCodeForm.handleSubmit(onVerifyCode)}
              >
                  <Form.Item
                      label="Verification Code"
                      validateStatus={verifyCodeForm.formState.errors.code ? "error" : ""}
                      help={verifyCodeForm.formState.errors.code?.message}
                  >
                      <Controller
                          name="code"
                          control={verifyCodeForm.control}
                          render={({ field }) => {
                            return <Input size="large" type='number' maxLength={6} placeholder="Enter verification code" {...field} /> 
                        }}
                      />
                  </Form.Item>
                  <div className='flex flex-col gap-2'>
                      <Button 
                          type="primary" 
                          size="large" 
                          htmlType="submit" 
                          loading={isLoadingVerifyCode} 
                          block
                      >
                          Verify Code
                      </Button>
                      <Button type='link' href={LOGIN_URL} block className="px-4! sm:px-10!">
                        Back to Login Page
                        </Button>
                  </div>
              </Form>
          )
          )}
          {currentStep === 2 && (
              <Form
                  name="changePassword"
                  layout="vertical"
                  className="px-4! sm:px-10! space-y-4"
                  onFinish={changePasswordForm.handleSubmit(onChangePassword)}
              >
                  <Form.Item
                      label="New Password"
                      validateStatus={changePasswordForm.formState.errors.password ? "error" : ""}
                      help={changePasswordForm.formState.errors.password?.message}
                  >
                      <Controller
                          name="password"
                          control={changePasswordForm.control}
                          render={({ field }) => <Input.Password size="large" placeholder="Enter new password" {...field} />}
                      />
                  </Form.Item>
                  <Form.Item
                      label="Confirm Password"
                      validateStatus={changePasswordForm.formState.errors.password_confirm ? "error" : ""}
                      help={changePasswordForm.formState.errors.password_confirm?.message}
                  >
                      <Controller
                          name="password_confirm"
                          control={changePasswordForm.control}
                          render={({ field }) => <Input.Password size="large" placeholder="Confirm new password" {...field} />}
                      />
                  </Form.Item>
                  <div className='flex flex-col gap-2'>
                      <Button 
                          type="primary" 
                          size="large" 
                          htmlType="submit" 
                          loading={isLoadingChangePassword} 
                          block
                      >
                          Change Password
                      </Button>
                      <Button type='link' href={LOGIN_URL} block className="px-4! sm:px-10!">
                        Back to Login Page
                      </Button>
                  </div>
              </Form>
          )}
          <Divider plain className="px-4! sm:px-10!">or</Divider>
          <div className="px-4! sm:px-10!">
              <a href={OAUTH_LINK}>
                  <Button 
                      type="default" 
                      icon={<img src="/images/svg/icons/flat-color-icons--google.svg" alt="google" />} 
                      size="large" 
                      block
                  >
                      Sign in with Google
                  </Button>
              </a>
          </div>
      </div>
  );
}