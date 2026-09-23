import { DEFAULT_LOCALE, LOCALES, type Locale } from "./constants";
import ru from "@/messages/ru";
import tr from "@/messages/tr";
import type { Messages } from "@/messages/tr";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getMessages(locale: string): Messages {
  return locale === "ru" ? ru : tr;
}

export function localeFromParam(locale: string | undefined): Locale {
  return locale && isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function tPath(locale: string, path = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
