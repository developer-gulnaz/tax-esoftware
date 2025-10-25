//import modules libraries
import type { Metadata } from "next";
import { Baloo_2 } from 'next/font/google'
import { Public_Sans } from "next/font/google";

//import custom components
import ClientWrapper from "components/common/ClientWrapper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import main theme scss
import "styles/theme.scss";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  weight: ['400', '600', '700'],
  subsets: ['devanagari', 'latin'],
  variable: '--font-baloo2',
  display: 'swap'
})


export const metadata: Metadata = {
  title: "dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientWrapper>
      <html lang="en" className="expanded">
        <body className={`${publicSans.variable} ${baloo.variable}`}>{children}</body>
      </html>
    </ClientWrapper>
  );
}
