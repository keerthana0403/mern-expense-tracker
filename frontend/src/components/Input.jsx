import React from "react";

const Input = ({ type = "text", placeholder, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className="input input-bordered w-full"
      // {...register(name)}
    />
  );
};

export default Input;
