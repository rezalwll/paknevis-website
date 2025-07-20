// مسیر: components/layout/Footer.tsx
import React from "react";

// مقدار سال یک‌بار در لود ماژول محاسبه می‌شود
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
      © {currentYear} My Awesome Site. All rights reserved.
    </footer>
  );
}
