import { useState, useEffect } from "react";
import { signup } from "../Services/auth";
import { getPasswordStrength } from "../Services/app";
import { useUser } from "../contexts/useContext";
import { toast } from "react-toastify";

export default function SignUp() {
  const { setUser, setAuthType } = useUser();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validation
    if (formData.password !== formData.password2) {
      toast.error("Passwords don't match!");
      setLoading(false); // add this here 🔧
      return;
    }

    if (!formData.terms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy!");
      setLoading(false);
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
    };

    try {
      const response = await signup(payload);

      if (response.success) {
        setUser(response.user); // Auto-login after signup
        toast.success(`Account created, welcome ${response.user.username}!`);
        setAuthType("signup");
        setLoading(false);
      } else {
        // Add this to see the actual errors:
        console.log("Full error response:", response);
        toast.error("Signup failed!");
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Signup error details:",
        error?.response?.data || error.message
      );
      toast.error("Signup failed! Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getPasswordStrength(formData.password).then(setStrength);
    }, 300);

    return () => clearTimeout(delay);
  }, [formData.password]);

  function getStrengthColor(score) {
    if (score < 15) return "#1e3a8a"; // Dark Blue
    if (score < 30) return "#3b82f6"; // Blue
    if (score < 45) return "#60a5fa"; // Light Blue
    if (score < 60) return "#facc15"; // Yellow
    if (score < 75) return "#f97316"; // Orange
    if (score < 90) return "#ef4444"; // Red
    return "#b91c1c"; // Dark Red
  }

  function getStrengthLabel(score) {
    if (score < 30) return "Weak 🔴";
    if (score < 60) return "Moderate 🟡";
    if (score < 90) return "Strong 🟠";
    return "Ultra 🔥";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input
          disabled={loading}
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Choose a username"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          disabled={loading}
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="you@example.com"
        />
      </div>

      <div className="relative space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>

        <div className="relative">
          <input
            disabled={loading}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-600 text-sm"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* strength bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${strength}%`,
              backgroundColor: getStrengthColor(strength),
            }}
          ></div>
        </div>

        {/* Optional: label for strength */}
        <div className="text-xs text-gray-600 font-medium">
          {getStrengthLabel(strength)}
        </div>
      </div>

      <div>
        <label
          htmlFor="password2"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          disabled={loading}
          id="password2"
          name="password2"
          type="password"
          required
          value={formData.password2}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirm your password"
        />
      </div>

      <div className="flex items-center">
        <input
          disabled={loading}
          id="terms"
          name="terms"
          type="checkbox"
          required
          checked={formData.terms}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
            Privacy Policy
          </a>
        </label>
      </div>

      <div>
        <button
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </form>
  );
}
