export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[rgba(243,236,227,0.12)] bg-oxblood py-[30px] text-center text-[11px] tracking-[0.08em] text-[rgba(243,236,227,0.55)]">
      © {year} Marina Cuesta · Executive Creative Director · Made with intention.
    </footer>
  );
}
