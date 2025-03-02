import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import '@/app/tailwind.css';
import '@/app/style.scss';
import { theme } from '@/app/theme.config';
import { AuthProvider } from "@/app/context/AuthContext";
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </html>
    </AuthProvider>
  );
}