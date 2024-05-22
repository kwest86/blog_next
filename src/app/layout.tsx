import type { Metadata } from "next";
import { Providers } from "../providers";
import { fonts } from "../fonts";
import { Layout } from "@/components/atoms/Layout";
import { Header } from "@/components/molecules/Header";
import { APP_DESCRIPTION, APP_TITLE } from "@/environments";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
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
          <Header />
          <Layout isLoading={false}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
