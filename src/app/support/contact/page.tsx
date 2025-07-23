"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
  });

  return (
    <main
      dir="rtl"
      className="
        min-h-screen flex items-center
        bg-[#e7f0ff]
        text-slate-800
        text-[16px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]
      "
    >
      <div
        className="
          mx-auto w-full
          px-4 md:px-8
          max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl
          mt-[-50px]
        "
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <div className="space-y-10 text-slate-700 text-right pt-15">
            <div>
              <h1
                className="
                  text-3xl md:text-4xl lg:text-5xl xl:text-[3.3rem] 2xl:text-[3.6rem]
                  font-semibold text-slate-900
                "
              >
                تماس با ما
              </h1>
              <p
                className="
                  mt-5
                  text-sm md:text-[1.05rem] lg:text-[1.12rem] xl:text-[1.2rem]
                  text-slate-500 leading-relaxed max-w-md
                "
              >
                ایمیل بزن، تماس بگیر یا فرم کنار صفحه را پر کن تا با هم در ارتباط
                باشیم و درباره‌ی نیازهایت صحبت کنیم.
              </p>
            </div>

            <div
              className="
                space-y-2
                text-sm md:text-[1.02rem] lg:text-[1.08rem]
              "
            >
              <p className="font-medium text-slate-900">info@example.com</p>
              <p className="font-medium text-slate-900">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 pt-3 border-t border-slate-200 mt-25">
              <div className="space-y-1.5">
                <h2
                  className="
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    font-semibold text-slate-900
                  "
                >
                  پشتیبانی مشتریان
                </h2>
                <p
                  className="
                    text-xs md:text-sm lg:text-[0.98rem]
                    text-slate-500 leading-relaxed
                  "
                >
                  تیم پشتیبانی ما آماده است تا هر سؤال یا مشکلی را بررسی کند.
                </p>
              </div>

              <div className="space-y-1.5">
                <h2
                  className="
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    font-semibold text-slate-900
                  "
                >
                  بازخورد و پیشنهادها
                </h2>
                <p
                  className="
                    text-xs md:text-sm lg:text-[0.98rem]
                    text-slate-500 leading-relaxed
                  "
                >
                  هر پیشنهادی برای بهتر شدن سرویس داریم با ما در میان بگذار.
                </p>
              </div>

              <div className="space-y-1.5">
                <h2
                  className="
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    font-semibold text-slate-900
                  "
                >
                  رسانه و همکاری
                </h2>
                <p
                  className="
                    text-xs md:text-sm lg:text-[0.98rem]
                    text-slate-500 leading-relaxed
                  "
                >
                  برای همکاری‌های رسانه‌ای و تجاری، با ایمیل مخصوص رسانه در تماس
                  باش.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="
                w-full
                max-w-md md:max-w-lg lg:max-w-xl
                bg-white rounded-3xl shadow-xl border border-slate-100
                px-5 py-6 sm:px-6 sm:py-7
              "
            >
              <div className="text-right mb-4 space-y-1">
                <h2
                  className="
                    text-2xl lg:text-3xl
                    font-semibold text-slate-900
                  "
                >
                  در تماس باشید
                </h2>
                <p
                  className="
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    text-slate-500
                  "
                >
                  هر زمان خواستی می‌توانی با ما ارتباط بگیری.
                </p>
              </div>

              <form
                className="
                  space-y-5
                  min-h-[300px]
                "
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="text-right relative">
                    <label
                      className={`absolute right-3 transition-all duration-300 ease-out pointer-events-none ${focused.firstName || firstName
                          ? "-top-2.5 text-[10px] text-blue-600 bg-white px-1"
                          : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                        }`}
                    >
                      نام
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={() =>
                        setFocused({ ...focused, firstName: true })
                      }
                      onBlur={() =>
                        setFocused({ ...focused, firstName: false })
                      }
                      className="
                        w-full rounded-xl border border-slate-200 bg-slate-50/60
                        px-3 py-2.5
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none focus:border-blue-500 focus:bg-white
                        focus:ring-1 focus:ring-blue-500
                        transition-all duration-300
                      "
                    />
                  </div>
                  <div className="text-right relative">
                    <label
                      className={`absolute right-3 transition-all duration-300 ease-out pointer-events-none ${focused.lastName || lastName
                          ? "-top-2.5 text-[10px] text-blue-600 bg-white px-1"
                          : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                        }`}
                    >
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={() =>
                        setFocused({ ...focused, lastName: true })
                      }
                      onBlur={() =>
                        setFocused({ ...focused, lastName: false })
                      }
                      className="
                        w-full rounded-xl border border-slate-200 bg-slate-50/60
                        px-3 py-2.5
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none focus:border-blue-500 focus:bg-white
                        focus:ring-1 focus:ring-blue-500
                        transition-all duration-300
                      "
                    />
                  </div>
                </div>

                <div className="text-right relative">
                  <label
                    className={`absolute right-3 transition-all duration-300 ease-out pointer-events-none z-10 ${focused.email || email
                        ? "-top-2.5 text-[10px] text-blue-600 bg-white px-1"
                        : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                      }`}
                  >
                    ایمیل
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() =>
                        setFocused({ ...focused, email: true })
                      }
                      onBlur={() =>
                        setFocused({ ...focused, email: false })
                      }
                      className="
                        w-full rounded-xl border border-slate-200 bg-slate-50/60
                        pr-3 pl-8 py-2.5
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none focus:border-blue-500 focus:bg-white
                        focus:ring-1 focus:ring-blue-500
                        transition-all duration-300
                      "
                    />
                  </div>
                </div>

                <div className="text-right relative">
                  <label
                    className={`absolute right-3 transition-all duration-300 ease-out pointer-events-none ${focused.phone || phone
                        ? "-top-2.5 text-[10px] text-blue-600 bg-white px-1"
                        : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                      }`}
                  >
                    شماره تماس
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() =>
                        setFocused({ ...focused, phone: true })
                      }
                      onBlur={() =>
                        setFocused({ ...focused, phone: false })
                      }
                      className="
                        flex-1 rounded-xl border border-slate-200 bg-slate-50/60
                        px-3 py-2.5
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none focus:border-blue-500 focus:bg-white
                        focus:ring-1 focus:ring-blue-500
                        transition-all duration-300
                      "
                    />
                  </div>
                </div>

                <div className="text-right relative">
                  <label
                    className={`absolute right-3 transition-all duration-300.ease-out pointer-events-none z-10 ${focused.message || message
                        ? "-top-2.5 text-[10px] text-blue-600 bg-white px-1"
                        : "top-3 text-sm text-slate-400"
                      }`}
                  >
                    چطور می‌توانیم کمک کنیم؟
                  </label>
                  <div
                    className="
                      rounded-2xl border border-slate-200 bg-slate-50/60
                      px-3 py-2.5
                      focus-within:border-blue-500 focus-within:bg-white
                      focus-within:ring-1 focus-within:ring-blue-500
                      transition-all.duration-300
                    "
                  >
                    <textarea
                      rows={3}
                      maxLength={220}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() =>
                        setFocused({ ...focused, message: true })
                      }
                      onBlur={() =>
                        setFocused({ ...focused, message: false })
                      }
                      className="
                        w-full resize-none bg-transparent
                        text-sm md:text-[0.98rem] lg:text-[1.05rem]
                        outline-none
                      "
                    />
                    <div className="mt-1 flex items-center justify-between text-[10px] md:text-xs text-slate-400">
                      <span>حداکثر ۲۲۰ کاراکتر</span>
                      <span>
                        {message.length}
                        /220
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="
                    mt-1 w-full rounded-full bg-blue-600 py-2.5
                    text-sm md:text-[0.98rem] lg:text-[1.05rem]
                    font-medium text-white shadow-md
                    transition hover:bg-blue-700
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    focus-visible:ring-offset-white
                  "
                >
                  ارسال پیام
                </button>

                <p
                  className="
                    mt-1 text-[10px] md:text-xs
                    text-center leading-relaxed text-slate-400
                  "
                >
                  با ارسال این فرم، با
                  <button
                    type="button"
                    className="mx-1 underline underline-offset-2"
                  >
                    شرایط استفاده
                  </button>
                  و
                  <button
                    type="button"
                    className="mx-1 underline underline-offset-2"
                  >
                    سیاست حریم خصوصی
                  </button>
                  موافقت می‌کنید.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
