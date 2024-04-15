// Import types, components and other functionality
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Provider from "./components/Provider";
import "./globals.css";

// Define the entry point of the app
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polar Data App",
  description: "Analyse your Polar training data",
};

export default function RootLayout({ children }: any) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full scroll-smooth antialiased`}
    >
      <body className="flex h-full flex-col">
        <Provider>
          <Header />
          <main className="grow">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
