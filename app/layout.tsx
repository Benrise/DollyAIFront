import '@/app/tailwind.css';
import '@/app/style.scss';

import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { Providers } from '@/app/providers';
import { theme } from '@/app/theme.config';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}