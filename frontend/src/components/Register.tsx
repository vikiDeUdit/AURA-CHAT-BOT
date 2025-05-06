import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await register(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="card w-2/3 md:w-1/3 min-w-md bg-base-300 shadow-lg">
      <div className="card-body">
        <p className="my-1 mx-auto card-title text-xl font-semibold">
          Create an account
        </p>
        <form
          className="my-2 w-full form-control flex flex-col gap-3"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="Full name"
            className="input input-lg w-full rounded-box focus:input-primary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm password"
            className="input input-lg w-full rounded-box focus:input-primary"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="my-1 btn btn-primary rounded-box transition-all duration-300 hover:scale-105"
          >
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            to="/login/signin"
            className="text-primary opacity-90 hover:opacity-100 hover:underline"
          >
            Sign-in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
