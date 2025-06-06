'use client';
import '../globals.css'
import Navbar from '@/app/ui/navBar/nav-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex-col flex min-h-screen bg-bgLigth">
        <Navbar />
        <div className="flex-grow bg-bgLigth">
          {children}
        </div>
      </body>
    </html>
  );
}
