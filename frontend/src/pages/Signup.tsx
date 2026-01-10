import { useEffect, useState } from "react";
import api from "../utils/app";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/authContext";

function Signup() {
  const {isAuthenticated, setIsAuthenticated, setUser} = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSendOtp = async () => {
    if (!email) return;
    setLoading(true);

    const res = await api.post("/api/auth/otp", { email });
    toast.success(res.data.message);
    setLoading(false);
    setStep("otp");
  };

  const handleVerifyOtp = async () => {

    try {
      if (!otp) return;
    setLoading(true);

    const res = await api.post("/api/auth/verify-otp", { email, otp });

    if (res.data.success) {
      toast.success(res.data.message);
      setLoading(false);
      setUser(res.data.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
    else {
      toast.error(res.data.message);
      setLoading(false);
    }
    } catch (error) {
      console.log("ERROR", error);
    }
    
  };

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/api/auth/google", {
          access_token: tokenResponse.access_token,
        });
        if (res.data.success) {
          toast.success(res.data.message);

          navigate("/dashboard");
          return;
        }
      } catch (error) {
        console.error("Google sign-up error:", error);
        toast.error("Google sign-up failed. Please try again.");
      }
    },
    onError: () => {
      toast.error("Google sign-up was cancelled or failed. Please try again.");
    },
    flow: "implicit",
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gray-50 p-20 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-5xl font-bold text-stone-900">
            Sign Up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account to start shortening URLs
          </p>
        </div>

        {/* Email OTP Section */}
        <div className="space-y-4">
          {step === "email" ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Sign Up"}
              </button>
              <button
                onClick={() => setStep("email")}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to Email
              </button>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or</span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={() => handleGoogleSignUp()}
          className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            {/* Google Icon SVG */}
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
