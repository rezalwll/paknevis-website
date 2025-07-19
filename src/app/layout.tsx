import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "پاک‌نویس | نرم‌افزار ویرایش متن فارسی",
  description:
    "با پاک‌نویس، خطایاب هوشمند فارسی، یک ویرایشگر برخط و آنلاین فارسی برای کمک به درست‌نویسی و غلط‌یابی املایی در رایانهٔ خود دارید تا خطاهای پرکاربرد در زمینهٔ ویرایش زبان فارسی را تکرار نکنید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title></title>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v26.0.2/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://paknevis.ir/static/web_client/favicon.ico"
        />
      </head>
      <body>
        <Header />
        <main className="flex-grow container mx-auto mt-10 px-4 sm:px-6 md:px-0 lg:px-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
