"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "1");
    setVisible(false);
  }

  if (!visible) return null;

  const isRu = locale === "ru";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-teal-dark/95 px-4 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-cream/90">
          {isRu
            ? "Мы используем только необходимые файлы cookie для работы сессии. Продолжая использование сайта, вы соглашаетесь с нашей "
            : "Sitemiz yalnızca oturum işlevi için zorunlu çerezler kullanır. Siteyi kullanmaya devam ederek "}
          <Link
            href={`/${locale}/kvkk`}
            className="underline text-gold hover:text-gold/80"
          >
            {isRu ? "политикой конфиденциальности" : "Gizlilik Politikamızı"}
          </Link>
          {isRu ? "." : " kabul etmiş olursunuz."}
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink hover:bg-gold/80 transition-colors"
        >
          {isRu ? "Принять" : "Kabul Et"}
        </button>
      </div>
    </div>
  );
}
