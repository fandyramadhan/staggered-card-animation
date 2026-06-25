export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-[1760px] px-6 pt-20 sm:px-10 sm:pt-28">
        {/* Top: tagline + link columns */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
              Your mind deserves
              <br />a safe place.
            </p>
            <a
              href="#"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-ink transition-transform duration-200 hover:scale-[1.03]"
            >
              Start for Free
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {[
              { title: "Product", links: ["Mood Tracker", "Journal", "Breathe", "Pricing"] },
              { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
              { title: "Social", links: ["Instagram", "Twitter", "LinkedIn", "YouTube"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-base text-white/80 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant brand wordmark */}
        <div className="mt-16 select-none sm:mt-24">
          <h2 className="whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.03em] text-[clamp(3rem,19vw,22rem)]">
            CODESIGN
          </h2>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/50 sm:flex-row">
          <p>© {year} CODESIGN. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
