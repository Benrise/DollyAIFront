"use client";

import { Button, Divider, Form, Input, Typography, Steps } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeSendCodeSchema, VerifyCodeSchema, ChangePasswordSchema, SendCodeSchema, TypeChangePasswordSchema, TypeVerifyCodeSchema } from '@/app/entities/auth';
import { useRecoverMutation } from '../hooks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const { Title } = Typography;


export function RecoverForm() {
    const OAUTH_LINK = process.env.NEXT_OAUTH_LINK

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
      router.push('/auth/login')
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
              className='px-10! mb-4!' 
              size='small' 
              current={currentStep}
              items={steps.map(item => ({ title: item.title }))}
          />
          {currentStep === 0 && (
              <Form
                  name="sendCode"
                  layout="vertical"
                  className="space-y-4 px-10!"
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
                  <Form.Item>
                      <Button 
                          type="primary" 
                          size="large" 
                          htmlType="submit" 
                          loading={isLoadingSendCode} 
                          block
                      >
                          Send Code
                      </Button>
                  </Form.Item>
              </Form>
          )}
          {currentStep === 1 && (
            (
              <Form
                  name="verifyCode"
                  layout="vertical"
                  className="space-y-4 px-10!"
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
                  <Form.Item>
                      <Button 
                          type="primary" 
                          size="large" 
                          htmlType="submit" 
                          loading={isLoadingVerifyCode} 
                          block
                      >
                          Verify Code
                      </Button>
                  </Form.Item>
              </Form>
          )
          )}
          {currentStep === 2 && (
              <Form
                  name="changePassword"
                  layout="vertical"
                  className="space-y-4 px-10!"
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
                  <Form.Item>
                      <Button 
                          type="primary" 
                          size="large" 
                          htmlType="submit" 
                          loading={isLoadingChangePassword} 
                          block
                      >
                          Change Password
                      </Button>
                  </Form.Item>
              </Form>
          )}
          <Button type='link' href="/auth/login" block className="px-10!">
              Back to Login Page
          </Button>
          <Divider plain className="px-10!">or</Divider>
          <div className="px-10!">
              <a href={OAUTH_LINK}>
                  <Button 
                      type="default" 
                      icon={<img src="/images/svg/oauth_google.svg" alt="google" />} 
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