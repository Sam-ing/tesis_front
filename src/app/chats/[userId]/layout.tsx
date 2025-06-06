import '../../globals.css'

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