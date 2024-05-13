import type { Metadata } from "next";
import { Providers } from "../providers";
import { fonts } from "../fonts";
import { Layout } from "@/components/atoms/Layout";

export const metadata: Metadata = {
  title: "テクもぐ",
  description: "色んな技術を食べ歩き！",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Layout isLoading={false}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
