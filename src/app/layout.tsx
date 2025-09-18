import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your App",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <ThemeProvider attribute="class"> {children}</ThemeProvider>

      </body>
    </html>
  );
}