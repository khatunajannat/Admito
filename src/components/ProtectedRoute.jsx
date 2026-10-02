import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/api";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  return getToken() ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}