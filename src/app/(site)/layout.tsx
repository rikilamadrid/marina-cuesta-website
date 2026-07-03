import Nav from "@/components/layout/Nav";
import Spine from "@/components/layout/Spine";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Skip link — first focusable element; visually hidden until focused so
          keyboard users can bypass the Spine/Nav and jump to page content. */}
      <a
        href="#main-content"
        className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-bone"
      >
        Skip to content
      </a>
      <Spine />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
