import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader";
import "./globals.css";
import { TooltipProvider } from "@harshitmahajan/ui";

export const metadata: Metadata = {
  title: "1126 UI Playground",
  description: "Integration test app for @harshitmahajan/ui",
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
