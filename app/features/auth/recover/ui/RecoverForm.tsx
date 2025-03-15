import { Button, Divider, Form, Input, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TypeSendCodeSchema, SendCodeSchema } from '@/app/entities/auth';
import { useRecoverMutation } from '../hooks';

const { Title } = Typography;


export function RecoverForm() {
    const OAUTH_LINK = process.env.NEXT_OAUTH_LINK

    const { sendCodeMutation, isLoadingSendCode } = useRecoverMutation();
    const { control, handleSubmit, formState: { errors } } = useForm<TypeSendCodeSchema>({
      resolver: zodResolver(SendCodeSchema),
    });

    return (
      <div className="flex flex-col gap-4">
        <Title level={3} className="text-center text-base sm:text-xl">
          Recover Password
        </Title>
        <Form
          name="register"
          layout="vertical"
          className="space-y-4 px-10!"
          onFinish={handleSubmit((values) => sendCodeMutation(values))}
        >
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
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" loading={isLoadingSendCode} block>
              Send Code
            </Button>
          </Form.Item>
          <Button type='link' href="/auth/login" block>Back to Login Page</Button>
          <Divider plain>or</Divider>
            <a href={OAUTH_LINK}>
              <Button type="default" icon={<img src="/images/svg/oauth_google.svg" alt="google"></img>} size="large" block>Sign in with Google</Button>
            </a>
        </Form>
      </div>
    )
}