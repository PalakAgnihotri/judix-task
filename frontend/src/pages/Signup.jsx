import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/");
    } catch (err){
  console.error("Signup error:", err.response?.data || err.message);
  setError(err.response?.data?.message || "Signup failed");
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-green-400">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/20 border border-white/30 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account ✨
        </h2>

        {error && (
          <p className="text-red-200 text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            placeholder="Name"
            className="p-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="p-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform"
          >
            Signup
          </button>
        </div>

        <p className="text-white text-sm mt-5 text-center">
          Already have an account?{" "}
          <Link to="/" className="font-semibold underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

