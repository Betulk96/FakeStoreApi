import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReduxProvider } from "@/provider/ReduxProvider";
import { ThemeProvider } from "next-themes";
import { locales } from "@/i18n";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// ✅ Next.js 15 için doğru layout tip tanımı
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ 
  children, 
  params 
}: LocaleLayoutProps) {
  const { locale } = await params;

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
            <main>{children}</main>
            <Footer />
          </div>
        </ReduxProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}