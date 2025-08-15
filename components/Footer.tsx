export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 mt-8 py-4 bg-pink-700 text-white text-center rounded-t-lg">
      <p>© {new Date().getFullYear()} FilmWiki. All rights reserved.</p>
    </footer>
  );
}
