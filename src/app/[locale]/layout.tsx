import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReduxProvider } from "@/provider/ReduxProvider";
import { ThemeProvider } from "next-themes";
import { locales } from "@/i18n";

import type { LayoutProps } from "@/types";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;  // ✅ destructure async

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider attribute="class">
      <ReduxProvider>
        <div className="min-h-screen flex flex-col bg-gradient-primary dark:bg-gradient-dark">
          <Header />
          <main >{children}</main>
          <Footer />
        </div>
        </ReduxProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

