import { Button, Form, Input, Typography, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Terms } from '@/app/entities/terms'
import { type TypeRegisterSchema, RegisterSchema } from '@/app/entities/auth';
import { useRegisterMutation } from '@/app/features/auth/register';
import { SubscriptionsList, useGetSubscriptionsListMutation } from '@/app/widgets/subscription/list';
import { ISubscriptionProduct } from '@/app/entities/subscription/card';
import { useCheckoutMutation } from '@/app/features/pricing/hooks';
import { useUserContext } from '@/app/providers';

const { Title } = Typography;

export function RegisterForm() {
    const OAUTH_LINK = process.env.NEXT_OAUTH_LINK;
    const LOGIN_URL = "/app/auth/login";

    const { checkoutMutation, isLoadingcheckout } = useCheckoutMutation();
    const { disableDrawerWatching } = useUserContext();
    const { registerMutation, isLoadingRegister } = useRegisterMutation();
    const [ isPlansHidden, setIsPlansHidden ] = useState<boolean>(false);
    const { subscriptions, getSubscriptionsListMutation } = useGetSubscriptionsListMutation();
    const { control, handleSubmit, formState: { errors } } = useForm<TypeRegisterSchema>({
      resolver: zodResolver(RegisterSchema),
    });

    const handleSelectPlan = async (subscription: ISubscriptionProduct) => {
      await disableDrawerWatching();
      handleSubmit((values) => {
          registerMutation(values, {
              onSuccess: () => {
                  checkoutMutation(subscription.id);
              }
          });
      })();
    };
    const handleRegisterWithoutPayment = handleSubmit((values) => {
      registerMutation(values);
    });

    useEffect(() => {
      getSubscriptionsListMutation();
    }, []);

    return (
      <div className="flex flex-col gap-4 h-fit md:min-h-fit">
        <Title level={3} className="text-center text-base md:text-xl">
          Registration
        </Title>
        <Form
          name="register"
          layout="vertical"
          className="px-4! md:px-10! flex flex-col gap-4 justify-between"
          onFinish={handleRegisterWithoutPayment}
        >
            <div className="flex flex-col">
              <Form.Item
                    label="Email"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email?.message}
                  >
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => <Input size="large" placeholder="Enter your email" {...field} />}
                    />
              </Form.Item>
              <Form.Item
                    label="Password"
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password?.message}
                  >
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => <Input.Password size="large" placeholder="Enter password" {...field} />}
                    />
              </Form.Item>
              <Form.Item
                  label="Confirm Password"
                  validateStatus={errors.password_confirm ? "error" : ""}
                  help={errors.password_confirm?.message}
              >
                    <Controller
                      name="password_confirm"
                      control={control}
                      render={({ field }) => <Input.Password size="large" placeholder="Repeat password" {...field} />}
                    />
              </Form.Item>
              {!isPlansHidden && <Form.Item label="Plan">
                <SubscriptionsList isActionsLoading={isLoadingRegister || isLoadingcheckout} subscriptions={subscriptions} onSubscriptionSelect={handleSelectPlan} actionLabel="Continue" className='flex md:flex-nowrap flex-wrap gap-4'/>
              </Form.Item>}
              <Form.Item>
                <Checkbox onChange={() => setIsPlansHidden(!isPlansHidden)}>Register without payment</Checkbox>
              </Form.Item>
              <div className="flex flex-col gap-2">
                {isPlansHidden && <Button type="primary" size="large" htmlType="submit" loading={isLoadingRegister} block>
                  Sign Up
                </Button>}
                <a href={OAUTH_LINK}>
                      <Button 
                          type="default" 
                          icon={<img src="/images/svg/oauth_google.svg" alt="google" />} 
                          size="large" 
                          block
                      >
                          Sign up with Google
                      </Button>
                </a>
                <Button type="link" href={LOGIN_URL} className="text-[14px]!" block>
                  Already have an account? Login
                </Button>
              </div>
            </div>
          <Terms/>
        </Form>
      </div>
    )
}