import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

const SignUp = () => {
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
        <button class="btn bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="divider text-sm text-base-content/50">or</div>

        {/* Form */}
        <form className="space-y-6">
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            // register={register}
            // error={errors.email}
          />
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            // register={register}
            // error={errors.email}
          />

          <Input
            type="email"
            placeholder="Email"
            name="email"
            // register={register}
            // error={errors.email}
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            // register={register}
            // error={errors.email}
          />

          <Button
            type={"submit"}
            className={"btn bg-cyan-900 hover:bg-cyan-800 w-full"}
            children={"Sign Up"}
          />
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center font-medium text-base-content/60">
          Already have an account?{" "}
          <a
            // href={type === "login" ? "/sign-up" : "/login"}
            className="text-primary font-semibold hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
