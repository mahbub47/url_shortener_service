import { ToastContainer } from "react-toastify";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleAuthWraper = () => {
  const clientID = "730139355395-it3qlc6s7chlotvgif2ukot7k5sa2dpf.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientID}>
      <Signup />
    </GoogleOAuthProvider>
  );
};
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<GoogleAuthWraper />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
