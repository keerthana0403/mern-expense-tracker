import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import GButton from "../../components/GButton";
import useGuestLogin from "../../hooks/useGuestLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const { loading: guestLoading, guestLogin } = useGuestLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleGuestLogin = async () => {
    await guestLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md bg-base-100 p-10 shadow-xl ">
        <h1 className="text-3xl font-bold mb-2">
          Login <span className="text-emerald-700">Expenso</span>
        </h1>
        <p className="mb-4 font-medium text-base-content/60">
          Hi, Welcome back 👋
        </p>

        {/* Google Sign-In Button */}
        <GButton />

        {/* Divider */}
        <div className="divider text-sm text-base-content/50">or</div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <Button
            type={"submit"}
            className={"btn  w-full bg-cyan-900 hover:bg-cyan-800"}
            children={
              !loading ? (
                "Log In"
              ) : (
                <span className="loading loading-spinner"></span>
              )
            }
          />

          {/* {!isGuest && ( */}

          <Button
            type={"button"}
            className={"btn w-full  bg-yellow-900 hover:bg-yellow-800"}
            children={
              !guestLoading ? (
                "Login as Guest"
              ) : (
                <span className="loading loading-spinner"></span>
              )
            }
            onClick={handleGuestLogin}
          />
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center font-medium text-base-content/60">
          Not registered yet?{" "}
          <Link
            to={"/signup"}
            className="text-primary font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
