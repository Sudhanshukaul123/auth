import { useUser } from "../contexts/useContext";
import { logout } from "../Services/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
  const { user, setUser, authType } = useUser();
  const navigate = useNavigate();
  const isOwner = user?.username === username;

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        setUser(null); // Clear user data from context
        alert("Logged Out Successfully");
        navigate("/"); // Redirect to login/auth page
      } else {
        alert("Logout failed, try again!");
      }
    } catch (error) {
      alert("Oops! Server's not responding. Restart the server maybe?");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          {authType === "signup" ? "Welcome" : " Welcome Back "}<br />{" "}
          {isOwner
            ? `${username} 👋`
            : `You’re viewing ${username}'s Profile 👀`}
        </h1>
        <p className="text-center text-gray-700 mb-8">
          {isOwner
            ? "Welcome to your profile page. You’re logged in and ready to rock."
            : "This profile belongs to someone else. You're in view only mode."}
        </p>

        {isOwner && (
          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
