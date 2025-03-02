import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import '@/app/tailwind.css';
import '@/app/style.scss';
import { theme } from '@/app/theme.config';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}