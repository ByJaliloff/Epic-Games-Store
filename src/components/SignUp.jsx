import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      alert("Bu email ilə artıq qeydiyyat var.");
      return;
    }

    const newUser = {
      ...form,
      id: crypto.randomUUID(),
      role: "user",
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white">
      <form
        onSubmit={handleRegister}
        className="bg-[#1a1a1a] p-8 rounded-xl w-[90%] max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create account</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#2a2a2a] text-white"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#2a2a2a] text-white"
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-[#2a2a2a] text-white"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-[#2a2a2a] text-white"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone (+994...)"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-[#2a2a2a] text-white"
        />
        <input
          name="birthday"
          type="date"
          value={form.birthday}
          onChange={handleChange}
          required
          className="w-full p-2 mb-6 rounded bg-[#2a2a2a] text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
