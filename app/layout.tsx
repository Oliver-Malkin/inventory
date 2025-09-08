import '@/components/misc/globals.css';

import { opensans } from '@/components/misc/fonts';
import { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import Toaster from '@/components/misc/toaster';

export const metadata: Metadata = {
  title: {
    template: "%s - IMS",
    default: "Inventory Management System"
  },
  description: "An inventory management system with an easy to use user interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${opensans.className} bg-White dark:bg-Onyx`}>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          enableColorScheme={true}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
