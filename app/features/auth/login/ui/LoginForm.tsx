import { useEffect, useState } from 'react';
import { Input, Button, Form, Spin, Typography } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Divider } from 'antd';

import { useMobileDetect } from '@/app/shared/hooks';
import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { Terms } from '@/app/entities/terms';
import { type TypeLoginSchema, LoginSchema } from '@/app/entities/auth';
import { ExampleGallery, useLoginMutation } from '@/app/features/auth/login';
import { fetchImages } from '@/app/widgets/auth/images';

const { Title } = Typography;


export function LoginForm() {
    const OAUTH_LINK = process.env.NEXT_OAUTH_LINK;
    const REGISTER_URL = "/pages/auth/register"
    const RECOVER_URL = "/pages/auth/recover"

    const { loginMutation, isLoadingLogin } = useLoginMutation();
    const { control, handleSubmit, formState: { errors } } = useForm<TypeLoginSchema>({
      resolver: zodResolver(LoginSchema),
    });
    const [parent] = useAutoAnimate();
    const [images, setImages] = useState<string[]>([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const { isMobile } = useMobileDetect();

    const handleFocus = () => setIsInputFocused(isMobile && true);
    const handleBlur = () => setIsInputFocused(isMobile && false);

    useEffect(() => {
      fetchImages().then(setImages);
    }, [])

    return (
      <div className="flex flex-col gap-4 h-fit sm:min-h-fit">
          <div ref={parent} className={`flex w-full ${isInputFocused ? "scale-0" : ""}`}>
              {!images.length ? (
                  <div className="flex justify-center items-center w-full">
                      <Spin size="large" />
                  </div>
              ) : !isInputFocused ? (
                <ExampleGallery images={images}/>
              ) : null}
          </div>
          <Title onClick={handleBlur} level={3} className="px-4! sm:px-10! text-center text-base sm:text-xl mb-8!">
            <div>
              <HighlightedText> Snuppy</HighlightedText> - your personal photoclone
            </div>
          </Title>
          <Form
            layout="vertical"
            className="px-4! sm:px-10! flex flex-col gap-4 justify-between"
            onFinish={handleSubmit((values) => loginMutation(values))}
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <Form.Item
                  validateStatus={errors.email ? "error" : ""}
                  className='mb-0!'
                  help={errors.email?.message}
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input size="large" placeholder="Enter your email" {...field} onFocus={handleFocus} />}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password?.message}
                  className='mb-0!'
                >
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <Input.Password size="large" placeholder="Enter password" {...field} onFocus={handleFocus} />}
                  />
                  <Button type="link" href={RECOVER_URL} size="small" className='text-[14px]! mt-2! justify-end!' block>Forgot password</Button>
                </Form.Item>
              </div>
              <div className="mb-2 flex flex-col gap-2">
                <Button type="primary" size="large" onClick={handleBlur} htmlType="submit" loading={isLoadingLogin} block>
                  Login
                </Button>
                <div className="flex">
                <Button type="link" href={REGISTER_URL} size="small" className='text-[14px]!' block>No account? Register</Button>
                </div>
                <Divider plain>or</Divider>
                <a href={OAUTH_LINK}>
                  <Button type="default" icon={<img src="/images/svg/oauth_google.svg" alt="google"></img>} size="large" onClick={handleBlur} block>Sign in with Google</Button>
                </a>
              </div>
            </div>
            <Terms/>
          </Form>
      </div>
    )
}