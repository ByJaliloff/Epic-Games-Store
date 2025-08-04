import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
      navigate("/"); // ana səhifəyə yönləndir
    } else {
      alert("Email və ya şifrə yalnışdır");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>

        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 rounded bg-[#2a2a2a] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 mb-6 rounded bg-[#2a2a2a] text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded font-semibold"
        >
          Continue
        </button>

        <p className="mt-6 text-center text-sm">
          New here?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
