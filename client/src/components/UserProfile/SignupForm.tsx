import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here, you would typically handle the sign-up logic, like sending the data to a server.
    // After successful sign-up, navigate to the login page.

    // Simulating successful sign-up for demonstration:
    console.log('Sign up successful with:', { username, email, password });
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 mb-6 p-12 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-5 text-center text-white">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-medium text-white">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Your username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-white">
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
          <label htmlFor="password" className="block text-lg font-medium text-white">
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
          <button
            type="submit"
            className="w-32 py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-6 text-center text-md text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:text-white">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;