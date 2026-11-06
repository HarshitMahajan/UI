import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/schibsted-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI Kit",
  description: "Browse components and install the ones you need.",
};

// Runs before first paint so dark mode never flashes white.
const applyTheme = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applyTheme }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
