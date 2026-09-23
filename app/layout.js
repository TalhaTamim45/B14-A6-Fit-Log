import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

// Display font for headings and banner
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

// Clean modern body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "FitLog — Train with Intent. Log Every Set.",
  description: "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#0d0f12] text-[#f3f4f6] font-sans antialiased selection:bg-[#ccff00] selection:text-black">
        <PlanProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#15181f',
                color: '#ffffff',
                border: '1px solid #282d3b',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '8px',
              },
              success: {
                iconTheme: {
                  primary: '#ccff00',
                  secondary: '#000000',
                },
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
