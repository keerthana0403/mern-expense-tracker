import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import GButton from "../../components/GButton";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md bg-base-100 p-10 shadow-xl ">
        <h1 className="text-3xl font-bold mb-2">
          Register <span className="text-emerald-700"> Expenso</span>
        </h1>
        <p className="mb-4 font-medium text-base-content/60">
          Create your account to get started
        </p>

        {/* Google Sign-In Button */}
        <GButton text={"Sign up with Google"} />

        {/* Divider */}
        <div className="divider text-sm text-base-content/50">or</div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={(e) =>
              setInputs({ ...inputs, firstName: e.target.value })
            }
            placeholder="First Name"
            required
          />
          <Input
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
            placeholder="Last Name"
            required
          />

          <Input
            type="email"
            name="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            placeholder="Email"
            required
          />

          <Input
            type="password"
            name="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            placeholder="Password"
            required
          />

          <Button
            type={"submit"}
            className={"btn bg-cyan-900 hover:bg-cyan-800 w-full"}
            children={
              !loading ? (
                "Sign Up"
              ) : (
                <span className="loading loading-spinner"></span>
              )
            }
            disabled={loading}
          />
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center font-medium text-base-content/60">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
