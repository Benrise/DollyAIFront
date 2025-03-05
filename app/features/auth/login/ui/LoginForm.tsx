import { useEffect, useState } from 'react';
import { Input, Button, Form, Spin, Typography } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useMobileDetect } from '@/app/shared/lib/hooks';

import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { Terms } from '@/app/entities/terms';
import { type TypeLoginSchema, LoginSchema } from '@/app/entities/auth';
import { ExampleGallery, useLoginMutation } from '@/app/features/auth/login';
import { fetchImages } from '@/app/widgets/auth/wrapper/lib';

const { Title } = Typography;


export function LoginForm() {
    const { loginMutation, isLoadingLogin } = useLoginMutation();
    const { control, handleSubmit, formState: { errors } } = useForm<TypeLoginSchema>({
      resolver: zodResolver(LoginSchema),
    });
    const [parent] = useAutoAnimate();
    const [images, setImages] = useState<string[]>([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const { isMobile } = useMobileDetect();

    useEffect(() => {
        fetchImages().then(setImages);
    }, [])

    const handleFocus = () => setIsInputFocused(isMobile && true);
    const handleBlur = () => setIsInputFocused(isMobile && false);

    return (
      <div className="flex flex-col gap-4">
          <div ref={parent} className={`flex w-full transition-all duration-300`}>
              {!images.length ? (
                  <div className="flex justify-center items-center w-full h-full">
                      <Spin size="large" />
                  </div>
              ) : !isInputFocused ? (
                  <ExampleGallery images={images} />
              ) : null}
          </div>
          <Title level={3} className="text-center text-base sm:text-xl px-10! mb-8!">
            <div>
              <HighlightedText> AI Love Photo</HighlightedText> - your personal photoclone
            </div>
          </Title>
        <Form
          layout="vertical"
          className="space-y-4 px-10!"
          onFinish={handleSubmit((values) => loginMutation(values))}
        >
          <Form.Item
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input size="large" placeholder="Enter your email" {...field} onFocus={handleFocus} onBlur={handleBlur} />}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password size="large" placeholder="Enter password" {...field} onFocus={handleFocus} onBlur={handleBlur} />}
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
      </div>
    )
}