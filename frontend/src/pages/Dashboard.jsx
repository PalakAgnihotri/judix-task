import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
      
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-[380px]">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Dashboard 🚀
        </h1>

        <div className="space-y-4">
          <div className="bg-indigo-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.name}
            </p>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
