import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import PageTransition from "@/components/PageTransition";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/lib/theme-context";
import { DiscussionProvider } from "@/lib/discussion-context";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ancol 360° CDP Dashboard",
  description:
    "Customer Data Platform — unified view of Ancol's guest intelligence, revenue, and engagement analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Anti-flash: read theme from localStorage before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('cdp-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
        <link rel="icon" href="/fav_ancol.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#060D1A] text-[#F0F6FF] font-sans antialiased mesh-bg overflow-x-hidden">
        <ThemeProvider>
          <DiscussionProvider>
          <div className="flex h-screen overflow-hidden">
            <SiteNav />
            <div className="flex-1 overflow-hidden flex flex-col pt-16 md:pt-0">
              <ErrorBoundary>
                <PageTransition>{children}</PageTransition>
              </ErrorBoundary>
            </div>
          </div>
          </DiscussionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
