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
      <Spine />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
