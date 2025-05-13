import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DashboardProvider, useDashboard } from "./Context/DahboardContext";
import AnimatedLoader from "./components/animation";
import LogoutModal from "./components/Modals/LogoutModal";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "CredBevy",
  description: "Best Loan Platform",
  icons: "/Image/crdbvylogo.svg", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardProvider>
          {children}
           
        </DashboardProvider>


        
      </body>
    </html>
  );
}
