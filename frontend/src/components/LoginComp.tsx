import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="card w-2/3 md:w-1/3 min-w-md bg-base-300 shadow-lg">
      <div className="card-body">
        <p className="my-2 mx-auto card-title text-xl font-semibold">
          Login to
          <strong className="text-primary font-semibold">Aditya</strong>
        </p>
        <form
          className="my-2 w-full form-control flex flex-col gap-4"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            className="input input-lg w-full rounded-box focus:input-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-lg w-full rounded-box focus:input-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="my-2 btn btn-primary rounded-box transition-all duration-300 hover:scale-105"
          >
            Sign-in
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link
            to="/login/register"
            className="text-primary opacity-90 hover:opacity-100 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComp;
