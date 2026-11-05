import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader";
import "./globals.css";
import { TooltipProvider } from "@harshitmahajan/ui";

export const metadata: Metadata = {
  title: "1126 UI",
  description: "1126 Labs design system: components and blocks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider delay={500}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
