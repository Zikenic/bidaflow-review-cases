import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BidaFlow - Quản lý quán bida",
  description: "Quản lý bàn, đặt bàn, phiên chơi, order, hóa đơn, kho và ca làm việc.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
