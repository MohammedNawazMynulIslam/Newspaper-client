import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../assets/loading.json";
import Lottie from "lottie-react";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div>
        <Lottie animationData={Loading}></Lottie>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoutes;
