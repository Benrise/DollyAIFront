'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input, Button, Typography, Form, Spin } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const { Title, Paragraph } = Typography;

export default function Login() {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/example-images')
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  const handleLoginSubmit = async (values: { email: string, password: string }) => {
    try {
      // TODO
    } catch (error) {
      console.error("Ошибка входа", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="max-w-lg w-full py-10 bg-white rounded-4xl shadow-lg shadow-indigo-50 overflow-hidden">
        <Title level={1} className="text-center mb-6">AI Love Photo</Title>
        <div className="mb-6">
          {!images.length ? (
          <div className='flex justify-center items-center w-full h-full'>
            <Spin size='large'/>
          </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              navigation={false}
              allowTouchMove={false}
              noSwiping={true}
              slidesPerView={1.4}
              speed={1000}
              centeredSlides={true} 
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center">
                    <Image
                      src={`/images/examples/${image}`}
                      alt={`Slide ${index}`}
                      width={1024}
                      height={1024}
                      className="rounded-2xl select-none"
                    />
                </SwiperSlide>
              ))}
          </Swiper>
          )}
        </div>

        <div className="mb-6 px-10">
          <Title level={4}>AI Love Photo - your personal photoclone</Title>
          <Paragraph>
            Forget about studios and photographers - create perfect shots with AI in minutes
          </Paragraph>
        </div>

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
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>Войти</Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => router.push('/auth/register')} block>Нет аккаунта? Зарегистрироваться</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
