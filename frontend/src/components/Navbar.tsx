
function Navbar() {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-sm">
      <h1 className="text-xl font-normal text-indigo-600">URL Shortener</h1>
      <nav className="space-x-4">
        <a
          href="/signup"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Sign Up
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
