import { useUser } from "../contexts/useContext";
import { logout } from "../Services/auth";
import { useNavigate } from "react-router-dom";
import AuthPage from "./Auth";


export default function HomePage() {
  return <AuthPage/>
}
