import '../../../globals.css';
import Navbar from '@/app/ui/navBar/nav-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-bgLigth">
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}