import '../globals.css';
import Navbar from '@/app/ui/navBar/nav-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen bg-gray-100">
        < Navbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}