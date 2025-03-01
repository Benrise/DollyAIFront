'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input, Button, Typography, Form } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Spin } from "antd";

const { Title, Paragraph } = Typography;


export default function Login() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/images')
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

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
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={1.4}
              centeredSlides={true} 
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
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
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
          >
            <Input size="large" placeholder="Введите логин" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
          >
            <Input.Password size="large" placeholder="Введите пароль" />
          </Form.Item>

          <Link href="/">
            <Form.Item>
              <Button type="primary" size='large' htmlType="submit" block>
                Войти
              </Button>
            </Form.Item>
          </Link>
        </Form>
      </div>
    </div>
  );
}
