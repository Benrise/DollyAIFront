import '@/app/tailwind.css';
import '@/app/style.scss';

import { type Metadata } from "next";
import { ConfigProvider } from 'antd';
import { Toaster } from 'sonner';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { MainProvider } from '@/app/providers';
import { theme } from '@/app/theme.config';

export const metadata: Metadata = {
  title: 'AI Love Photo',
  description: "AI Love Photo - your personal photoclone",
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  appleWebApp: {
    title: 'AI Love Photo',
  },
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <AntdRegistry>
            <MainProvider>
              <ConfigProvider theme={theme}>
                {children}
                <Toaster/>
              </ConfigProvider>
            </MainProvider>
          </AntdRegistry>
      </body>
    </html>
  );
}