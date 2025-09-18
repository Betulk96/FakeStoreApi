import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});

export const config = {
  // Lokalize edilecek rotalar
  matcher: ["/", "/(en|tr)/:path*"]
};
