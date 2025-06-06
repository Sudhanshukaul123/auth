import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./Signup";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState("signin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Authentication 
          </h1>
          <p className="mt-2 text-gray-600">Sign in to access YOUR account</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex mb-6 bg-white rounded-xl p-1.5 shadow-md">
          <button
            className={`w-1/2 py-2.5 text-center rounded-lg transition-all duration-200 font-medium ${
              authMode === "signin"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 hover:font-bold"
            }`}
            onClick={() => setAuthMode("signin")}
          >
            Sign In 
          </button>
          <button
            className={`w-1/2 py-2.5 text-center rounded-lg transition-all duration-200 font-medium 
                ${authMode === "signup"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 hover:font-bold"
            }`}
            onClick={() => setAuthMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          {authMode === "signin" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
}
