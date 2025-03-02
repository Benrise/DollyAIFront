"use client"

import { Input, Button, Typography, Form } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSubmit = async (values: { email: string, password: string, password_confirm: string }) => {
    try {
      // TODO
    } catch (error) {
      console.error("Ошибка регистрации", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="max-w-lg w-full py-10 bg-white rounded-4xl shadow-lg shadow-indigo-50 overflow-hidden">
        <Title level={1} className="text-center mb-6">AI Love Photo</Title>
        
        <div className="mb-6 px-10 text-center">
          <Title level={4}>Registration</Title>
        </div>

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

          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="link"
              onClick={() => router.push('/auth/login')}
              block
            >
              Уже есть аккаунт? Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
