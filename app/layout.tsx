import ClientWrapper from "components/common/ClientWrapper";
import type { Metadata } from "next";
import { Baloo_2, Public_Sans } from "next/font/google";
import "styles/theme.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  weight: ["400", "600", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-baloo2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="expanded">
      <body className={`${publicSans.variable} ${baloo.variable}`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
