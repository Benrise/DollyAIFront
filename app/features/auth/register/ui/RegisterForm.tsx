'use client'

import { Input, Button, Form, Typography } from 'antd';

import { Terms } from '@/app/entities/terms';

export function RegisterForm() {
    const handleRegisterSubmit = async (values: { email: string, password: string, password_confirm: string }) => {
        try {
          console.log(values)
        } catch (error) {
          console.error("Ошибка входа", error);
        }
      };


    return (
        <Form
            name="register"
            layout="vertical"
            initialValues={{ remember: true }}
            className="space-y-4 px-10!"
            onFinish={handleRegisterSubmit}
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
            { pattern: /[a-z]/, message: "Password must contain at least one lowercase letter." },
            { pattern: /[A-Z]/, message: "Password must contain at least one uppercase letter." },
            { pattern: /\d/, message: "Password must contain at least one digit." },
            { pattern: /[#@$!%&*?]/, message: "Password must contain at least one special character (#$@!%&*?)." },
          ]}
        >
          <Input.Password size="large" placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password_confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: "Confirm your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match."));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm password" />
        </Form.Item>

        <Form.Item className='mb-2!'>
          <Button type="primary" size="large" htmlType="submit" block>Register</Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" href='/auth/login' className='text-[14px]!' block>Already have an account? Login</Button>
        </Form.Item>
         <Terms/>
      </Form>
    )
}