import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen bg-gray-100">
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
