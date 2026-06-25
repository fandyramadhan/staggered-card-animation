export default function Header() {
  return (
    <header className="flex justify-center py-6 sm:py-7">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-codesign.svg"
        alt="CODESIGN"
        className="h-7 w-auto sm:h-8"
      />
    </header>
  );
}
