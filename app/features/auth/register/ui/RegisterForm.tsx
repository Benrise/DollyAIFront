import { Button, Form, Input } from 'antd';
import { Terms } from '@/app/entities/terms'
import { useRegisterMutation } from '@/app/features/auth/register';

export function RegisterForm() {
    const { registerMutation, isLoadingRegister } = useRegisterMutation();

    return (
        <Form
            name="register"
            layout="vertical"
            initialValues={{ remember: true }}
            className="space-y-4 px-10!"
            onFinish={registerMutation}
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
          <Input.Password size="large" placeholder="Repeat password" />
        </Form.Item>

        <Form.Item className='mb-2!'>
          <Button type="primary" size="large" htmlType="submit" loading={isLoadingRegister} block>Register</Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" href='/auth/login' className='text-[14px]!' block>Already have an account? Login</Button>
        </Form.Item>
         <Terms/>
      </Form>
    )
}