import type { Metadata } from "next";
import { Urbanist, Geist } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";
import { unstable_ViewTransition as ViewTransition } from "react";
import { DialogProvider } from "@/context/ModalContext";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TriVance App",
  description: "Appointment scheduling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geist.variable} ${urbanist.className} antialiased `}>
        <ViewTransition>
          <DialogProvider>
            <UserProvider>
              <main>
                <Toaster />
                {children}
              </main>
            </UserProvider>
          </DialogProvider>
        </ViewTransition>
      </body>
    </html>
  );
}
