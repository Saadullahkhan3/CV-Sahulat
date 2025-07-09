import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CV Sahulat - Professional CV Solutions',
  description: 'Create and manage your CV effortlessly with CV Sahulat. Professional templates, intuitive tools, and expert guidance to advance your career.',
  keywords: 'CV, resume, professional, templates, career, job search, CV builder',
  authors: [{ name: 'SUK' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#06b6d4',
  openGraph: {
    title: 'CV Sahulat - Professional CV Solutions',
    description: 'Create and manage your CV effortlessly with modern templates and expert guidance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Sahulat - Professional CV Solutions',
    description: 'Create and manage your CV effortlessly with modern templates and expert guidance.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}