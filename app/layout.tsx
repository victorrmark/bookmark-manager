import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
      {/* <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Auto apply dark mode if system theme is dark
              if (typeof window !== 'undefined' && 
                  window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head> */}
      <body className={`${manrope.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>This will appear everywhere</div>
          {children}
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
