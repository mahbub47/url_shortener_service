import { useAuth } from "../contexts/authContext";

function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const handleLogout = () => {
    alert("Logout functionality to be implemented");
  };
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-sm">
      <h1 className="text-xl font-normal text-indigo-600">URL Shortener</h1>
      <nav className="space-x-4">
        {isAuthenticated ? (
          <><span className="text-gray-700 font-semibold text-md">Welcome, <span className="text-sm font-normal">{user?.email}</span></span>
          <a className="cursor-pointer" onClick={handleLogout}>logout</a></>
        ) : (
          <a
            href="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </a>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
