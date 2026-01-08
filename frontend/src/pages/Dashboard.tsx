import Footer from "../components/Footer"
import Navbar from "../components/Navbar"


function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {/* Shorten URL Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Shorten a New URL</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              placeholder="Enter long URL (e.g., https://example.com/very-long-url)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            </button>
          </div>
        </div>

        {/* URLs Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Shortened URLs</h2>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard