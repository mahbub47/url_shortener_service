import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen min-w-screen">
      {/* Header/Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Shorten Your URLs{" "}
          <span className="text-indigo-600">Effortlessly</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Create short, shareable links in seconds. Track clicks, manage your
          URLs, and share with ease. Free to start!
        </p>
        <div className="space-x-4">
          <a
            href="/signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="/signup"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Sign Up
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">
                Easy Shortening
              </h4>
              <p className="text-gray-600">
                Paste your long URL and get a short link instantly.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">
                Track Clicks
              </h4>
              <p className="text-gray-600">
                Monitor performance with detailed click analytics.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">
                Secure & Fast
              </h4>
              <p className="text-gray-600">
                Reliable redirection with user authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
