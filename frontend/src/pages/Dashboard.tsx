import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import api from "../utils/app";
import { toast } from "react-toastify";
import { IoMdCopy } from "react-icons/io";

function Dashboard() {
  const { isAuthenticated, shortUrls } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      console.log("before call");
      const res = await api.post("/api/url/shorten", { longUrl: url });
      console.log("Response: ", res);
      if (res.data.success) {
        setUrl("");
        setIsLoading(false);
        toast.success("Short URL generated successfully");
      }

      if(!res.data.success){
        alert(res.data.message);
      }
    } catch (error) {
      console.log("ERRO HAPPENED WHILE GENERATING SHORT URL" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = async (shortCode: string) => {
    try {
      window.open(`http://localhost:5001/api/url/${shortCode}`, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const copyTextToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  const deleteUrl = async (shortCode: string) => {
    try {
      const res = await api.delete(`/api/url/${shortCode}`);
      if(res.data.success){
        toast.success("URL deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {/* Shorten URL Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Shorten a New URL
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              placeholder="Enter long URL (e.g., https://example.com/very-long-url)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              disabled={isLoading}
              onClick={handleGenerate}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate
            </button>
          </div>
        </div>

        {/* URLs Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Shortened URLs
          </h2>
          {shortUrls?.map((urlObj) => (
            <div
              key={urlObj.shortCode}
              className="mb-4 p-4 border border-gray-200 rounded-md"
            >
              <p className="text-gray-700 overflow-hidden">
                <span className="font-semibold ">Original URL:</span>{" "}
                {urlObj.originalUrl}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Short Code:</span>{" "}
                <span
                  className="underline text-blue-600 italic font-semibold cursor-pointer"
                  onClick={() => handleRedirect(urlObj.shortCode)}
                >
                  {urlObj.shortCode}
                </span>{" "}
                <span>
                  <button className="font-extrabold cursor-pointer"
                    onClick={() => { copyTextToClipboard(`http://localhost:5001/api/url/${urlObj.shortCode}`);}}>
                    <IoMdCopy className="text-xl"/>
                  </button>
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(urlObj.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Access Count:</span>{" "}
                {urlObj.accessCount}
              </p>
              <button onClick={() => deleteUrl(urlObj.shortCode)} className="bg-red-500 px-3 py-2 rounded-xl mt-2 text-white cursor-pointer">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
