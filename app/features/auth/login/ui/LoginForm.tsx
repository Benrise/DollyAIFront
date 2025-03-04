import { Input, Button, Form } from 'antd';

import { Terms } from '@/app/entities/terms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { type TypeLoginSchema, LoginSchema } from '@/app/entities/auth';
import { useLoginMutation } from '@/app/features/auth/login';

export function LoginForm() {
    const { loginMutation, isLoadingLogin } = useLoginMutation();
    const { control, handleSubmit, formState: { errors } } = useForm<TypeLoginSchema>({
      resolver: zodResolver(LoginSchema),
    });

    return (  
      <Form
      layout="vertical"
      className="space-y-4 px-10!"
      onFinish={handleSubmit((values) => loginMutation(values))}
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
      <Form.Item className="mb-2!">
        <Button type="primary" size="large" htmlType="submit" loading={isLoadingLogin} block>
          Login
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="link" href='/auth/register' size="small" className='text-[14px]!' block>No account? Register</Button>
      </Form.Item>
      <Terms/>
    </Form>
    )
}