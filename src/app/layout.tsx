'use client'
import './globals.css';
import Footer from './ui/footer/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex-col min-h-screen w-screen">
        <main className='flex-grow bg-bgLigth'>
          {children}
        </main>
        < Footer />
      </body>
    </html>
  );
}
