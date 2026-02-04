import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Values Department | Marriage & Pre-Marriage Counseling",
  description:
    "Official Values Department website providing marriage services, pre-marriage counseling, and family guidance programs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
