import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ElecNorme - Référence NFC 15-100 pour professionnels',
  description:
    'Référence technique NF C 15-100 (édition 2020) pour électriciens : valeurs normatives, tableaux de dimensionnement, calculateurs et checklists conformité. Accès rapide aux règles essentielles des installations électriques en France.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ElecNorme',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
  ],
};

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { AssistantChat } from '@/components/ai/assistant-chat';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CommandMenu } from '@/components/layout/command-menu';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { ThemeInitializer } from '@/components/theme/theme-initializer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`min-h-screen antialiased flex flex-col overflow-x-hidden ${inter.className}`}
      >
        <Providers>
          <ThemeInitializer />
          <CommandMenu />
          <Header />
          <div className="flex flex-1">
            <Sidebar className="hidden xl:block" />
            <main className="flex-1 overflow-auto bg-muted/20">
              <Breadcrumbs />
              {children}
            </main>
          </div>
          <AssistantChat />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
