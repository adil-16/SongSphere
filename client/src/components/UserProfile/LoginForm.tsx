import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="max-w-lg mx-auto mt-10 mb-6 p-12 bg-gray-800 rounded-lg shadow-lg"  >
      <h2 className="text-3xl font-bold mb-5 text-center text-white">Login</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full text-md px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex justify-center">
          <Link to="/" className="w-full text-center">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </Link>
        </div>

        <p className="mt-6 text-center text-md  text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-600 hover:text-white">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
