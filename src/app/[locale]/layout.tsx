import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { routing } from "@/lib/utils/i18n/routing";
import { notFound } from "next/navigation";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ali Mohammed Al-Ghanay | Software Developer, Project Lead & Teaching Assistant",
  description:
    "Experienced Software Developer, Project Lead, and University Teaching Assistant from Tripoli, Libya. Specializing in Flutter, Next.js, React, Clean Architecture, and full-stack development.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
