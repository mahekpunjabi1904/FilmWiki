import Image from "next/image";

export default function Header() {
  return (
    // Simple header container with padding and background
    <header className="flex items-center p-1 bg-pink-100 dark:bg-pink-800">
      {/* Logo image */}
      <Image
        src="/filmwiki-logo.png" 
        alt="FilmWiki Logo"       // alternative text for accessibility
        width={70}               
        height={20}              
        priority                  // load early for better UX
      />
      {/* App name next to logo */}
      <h1 className="text-xl font-bold">FilmWiki</h1>
    </header>
  );
}
