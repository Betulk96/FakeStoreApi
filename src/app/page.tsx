import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  
  // Tarayıcı dilini kontrol et
  const prefersTurkish = acceptLanguage.toLowerCase().includes("tr");
  const defaultLocale = prefersTurkish ? "tr" : "en";
  
  // Varsayılan locale'e yönlendir
  redirect(`/${defaultLocale}`);
}