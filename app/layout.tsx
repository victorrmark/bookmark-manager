import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { ReactQueryProvider as QueryClientProvider } from "@/providers/react-query-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description: "Manage all bookmarks for easy access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              classNames: {
                description: "var(--toast-text)",
              },
              style: {
                background: "var(--toast-bg)",
                color: "var(--toast-text)",
                outline: "none",
                border: "none",
                marginLeft: "5px",
              },
            }}
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
