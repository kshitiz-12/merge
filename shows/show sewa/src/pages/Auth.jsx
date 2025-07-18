import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMode, setLoginMode] = useState("user"); // 'user' or 'admin'
  const [form, setForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState(""); // username or phone
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const [signupOtp, setSignupOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password); // use context login!
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setSignupOtpSent(true); // <-- THIS LINE is important!
    } catch (err) {
      setSignupError(err.message);
    }
    setSignupLoading(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: loginIdentifier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    }
    setLoginLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: loginIdentifier, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");
      // Save token and user info (if you use context, update here)
      localStorage.setItem("token", data.token);
      // Optionally update context or redirect
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoginLoading(false);
  };

  const handleVerifySignupOtp = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);
    try {
      const res = await fetch("/api/auth/verify-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupForm.email, otp: signupOtp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");
      // Success! Optionally show a message or redirect to login
      setSignupOtpSent(false);
      setSignupForm({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
      });
      setSignupOtp("");
      alert("Signup successful! You can now log in.");
      // Optionally switch to login view:
      // setIsSignUp(false);
    } catch (err) {
      setSignupError(err.message);
    }
    setSignupLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="relative w-full max-w-3xl min-h-[500px] flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Login Form Section (Left) */}
        <div className="w-1/2 flex flex-col justify-center items-center px-8 py-12 z-10">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <div className="flex gap-3 mb-4">
            <button className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition"><span className="sr-only">Google</span>G+</button>
            <button className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition"><span className="sr-only">Facebook</span>F</button>
            <button className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition"><span className="sr-only">LinkedIn</span>in</button>
          </div>
          <p className="text-gray-400 text-sm mb-4">or use your email password</p>
          <div className="flex justify-center gap-4 mb-4">
            <button
              type="button"
              className={`px-4 py-1 rounded-full font-semibold border transition-all duration-200 ${loginMode === "user" ? "bg-purple-600 text-white border-purple-600" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-purple-100"}`}
              onClick={() => setLoginMode("user")}
            >
              User
            </button>
            <button
              type="button"
              className={`px-4 py-1 rounded-full font-semibold border transition-all duration-200 ${loginMode === "admin" ? "bg-purple-600 text-white border-purple-600" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-purple-100"}`}
              onClick={() => setLoginMode("admin")}
            >
              Admin
            </button>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              name="email"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              placeholder="Email or Username"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="text-right text-xs text-gray-400 mb-2 cursor-pointer hover:underline">Forgot Your Password?</div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading
                ? loginMode === "admin"
                  ? "Signing in as Admin..."
                  : "Signing in as User..."
                : loginMode === "admin"
                ? "SIGN IN AS ADMIN"
                : "SIGN IN AS USER"}
            </button>
            {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          </form>
        </div>
        {/* Signup Form Section (Right) */}
        <div className="w-1/2 flex flex-col justify-center items-center px-8 py-12 z-10">
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          <form
            onSubmit={signupOtpSent ? handleVerifySignupOtp : handleSignupSubmit}
            className="w-full flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              placeholder="Name"
              value={signupForm.name}
              onChange={handleSignupChange}
              required
              disabled={signupOtpSent}
            />
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              placeholder="Username"
              value={signupForm.username}
              onChange={handleSignupChange}
              required
              disabled={signupOtpSent}
            />
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              placeholder="Email"
              value={signupForm.email}
              onChange={handleSignupChange}
              required
              disabled={signupOtpSent}
            />
            <input
              type="text"
              name="phone"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              placeholder="Phone Number"
              value={signupForm.phone}
              onChange={handleSignupChange}
              required
              disabled={signupOtpSent}
            />
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              placeholder="Password"
              value={signupForm.password}
              onChange={handleSignupChange}
              required
              disabled={signupOtpSent}
            />
            {signupOtpSent && (
              <input
                type="text"
                name="otp"
                className="w-full px-4 py-2 border rounded bg-gray-100"
                placeholder="Enter OTP"
                value={signupOtp}
                onChange={e => setSignupOtp(e.target.value)}
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
              disabled={signupLoading}
            >
              {signupLoading
                ? signupOtpSent
                  ? "Verifying OTP..."
                  : "Sending OTP..."
                : signupOtpSent
                ? "Verify OTP"
                : "Sign Up"}
            </button>
            {signupError && (
              <div className="text-red-600 font-semibold text-center">
                {signupError}
              </div>
            )}
          </form>
        </div>
        {/* Animated Purple Panel Overlay */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 text-white flex flex-col items-center justify-center transition-all duration-700 z-20 pointer-events-none select-none
            ${isSignUp ? "right-0 rounded-l-3xl" : "left-0 rounded-r-3xl"}`}
          style={{
            transform: isSignUp ? "translateX(0%)" : "translateX(0%)",
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full pointer-events-auto">
            {isSignUp ? (
              <>
                <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                <p className="mb-6 text-lg text-center max-w-xs">To keep connected with us please login with your personal info</p>
                <button
                  className="border border-white px-8 py-2 rounded font-semibold hover:bg-white hover:text-purple-700 transition"
                  onClick={() => setIsSignUp(false)}
                >
                  SIGN IN
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
                <p className="mb-6 text-lg text-center max-w-xs">Register with your personal details to use all site features</p>
                <button
                  className="border border-white px-8 py-2 rounded font-semibold hover:bg-white hover:text-purple-700 transition"
                  onClick={() => setIsSignUp(true)}
                >
                  SIGN UP!
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 