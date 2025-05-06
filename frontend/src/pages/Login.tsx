import { useNavigate, useParams } from "react-router-dom";
import LoginComp from "../components/LoginComp";
import Register from "../components/Register";
import Error from "../components/Error";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      {mode === "signin" ? (
        <LoginComp />
      ) : mode === "register" ? (
        <Register />
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Login;
