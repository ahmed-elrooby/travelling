import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Providers/AuthContext/AuthProvider";
import QueryProvider from "./Providers/QueryProvider/Query";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {

  title: {
    default: "Exclusive Travel",
    template: "%s | Exclusive Travel",
  },

  description:
    "منصة متكاملة لحجز الفنادق والطيران والسيارات بأفضل الأسعار وتجربة حجز سهلة وآمنة.",

  keywords: [
    "حجز فنادق",
    "حجز طيران",
    "حجز سيارات",
    "فنادق دبي",
    "رحلات سفر",
    "Travel Booking",
    "Hotel Booking",
    "Flight Booking",
  ],

  authors: [
    {
      name: "Ahmed Eid",
    },
  ],

  creator: "Ahmed Eid",

 

  

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}