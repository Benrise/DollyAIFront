import '@/app/tailwind.css';
import '@/app/style.scss';

import { type Metadata } from "next";
import { Toaster } from 'sonner';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleTagManager } from '@next/third-parties/google';

import { MainProvider } from '@/app/providers';
import { FacebookPixel } from '@/app/widgets/facebook';

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
            <div className="flex flex-col sm:items-center sm:justify-center h-full">
              {children}
            </div>
            <Toaster/>
          </MainProvider>
        </AntdRegistry>
        <GoogleTagManager gtmId="GTM-NM76B9RL" />
        <FacebookPixel pixelId="1826949551477772"/>
      </body>
    </html>
  );
}