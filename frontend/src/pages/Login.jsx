import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/20 border border-white/30 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-200 text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </div>

        <p className="text-white text-sm mt-5 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

