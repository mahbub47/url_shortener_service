import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import api from "../utils/app";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser, setIsAuthenticated, setIsLoading} = useAuth();
  const handleLogout = async () => {
    setIsLoading(true);
    const res = await api.post("/api/auth/logout");
    if(res.data.success){
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      toast.success("Logged out successfully");
      navigate("/");
    }
    setIsLoading(false);
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
