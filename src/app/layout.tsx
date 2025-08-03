import type { Metadata } from "next";

import "./globals.css";

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
    <html lang="fa">
      <head>
        <title></title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://paknevis.ir/static/web_client/favicon.ico"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
