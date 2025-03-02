'use client'

import { Input, Button, Form } from 'antd';

import { signIn } from 'next-auth/react';
import { Terms } from '@/app/entities/terms';

export function LoginForm() {

    const handleLoginSubmit = async (values: { email: string, password: string }) => {
        try {
          await signIn("credentials", { email: values.email, password: values.password });
        } catch (error) {
          console.error("Ошибка входа", error);
        }
      };

    return (
        <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        className="space-y-4 px-10!"
        onFinish={handleLoginSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required!' },
            { type: 'email', message: 'Invalid email!' },
            { min: 5, message: 'Email must be at least 5 characters long' },
            { max: 128, message: 'Email must be less than 128 characters long' }
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password size="large" placeholder="Enter password" />
        </Form.Item>
        <Form.Item className='mb-2!'>
          <Button type="primary" size="large" htmlType="submit" block>Login</Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" href='/auth/register' size="small" className='text-[14px]!' block>No account? Register</Button>
        </Form.Item>
        <Terms/>
      </Form>
    )
}