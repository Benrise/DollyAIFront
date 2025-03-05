import { Button, Form, Input, Typography } from 'antd';
import { Terms } from '@/app/entities/terms'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TypeRegisterSchema, RegisterSchema } from '@/app/entities/auth';
import { useRegisterMutation } from '@/app/features/auth/register';

const { Title } = Typography;


export function RegisterForm() {
    const { registerMutation, isLoadingRegister } = useRegisterMutation();
    const { control, handleSubmit, formState: { errors } } = useForm<TypeRegisterSchema>({
      resolver: zodResolver(RegisterSchema),
    });

    return (
      <div className="flex flex-col gap-4">
        <Title level={3} className="text-center text-base sm:text-xl">
          Registration
        </Title>
        <Form
          name="register"
          layout="vertical"
          className="space-y-4 px-10!"
          onFinish={handleSubmit((values) => registerMutation(values))}
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
          <Form.Item className="mb-2!">
            <Button type="primary" size="large" htmlType="submit" loading={isLoadingRegister} block>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" href="/auth/login" className="text-[14px]!" block>
              Already have an account? Login
            </Button>
          </Form.Item>
          <Terms/>
        </Form>
      </div>
    )
}