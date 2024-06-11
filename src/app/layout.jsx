import "./globals.css";
import { Inter } from "next/font/google";
import { NextUIProviders } from "../providers/NextUIProviders";
import ReduxProviders from '@/providers/ReduxProviders';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant",
  description: "Sales Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ReduxProviders>
          <NextUIProviders>
            {children}
            <Toaster position="top-right" closeButton />
          </NextUIProviders>
        </ReduxProviders>
      </body>
    </html>
  );
}
