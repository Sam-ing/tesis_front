import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex-col min-h-screen">
        <div className='flex-grow'>
          {children}
        </div>
      </body>
    </html>
  );
}
