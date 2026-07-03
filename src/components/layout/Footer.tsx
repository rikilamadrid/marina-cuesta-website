export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[rgba(243,236,227,0.12)] bg-oxblood py-[30px] text-[11px] tracking-[0.08em] text-[rgba(243,236,227,0.55)]">
      <div className="text-center">
        © {year} Marina Cuesta · Executive Creative Director · Made with intention.
      </div>
      <div className="mt-2 text-center text-[10px] text-[rgba(243,236,227,0.32)] max-[600px]:mt-3 min-[601px]:pr-[30px] min-[601px]:text-right">
        Lamadrid Labs © {year}
      </div>
    </footer>
  );
}
