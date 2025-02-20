import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "../styles/globals.css";

const opensans = Open_Sans({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "Blog LGC",
  description: "Test task for Lets Get Checked",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${opensans.variable} antialiased`}>
        <main className="pt-12 pb-24">{children}</main>
        <div id="portal"></div>
      </body>
    </html>
  );
}
