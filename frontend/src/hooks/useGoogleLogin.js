import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const googleLogin = async (tokenResponse) => {
    console.log(tokenResponse);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenResponse.access_token,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      console.log(data);

      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, googleLogin };
};

export default useGLogin;
