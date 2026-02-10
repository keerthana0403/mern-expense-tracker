import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import API from "../api/api";

const useGLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const googleLogin = async (tokenResponse) => {
    setLoading(true);
    try {
      const res = await API.post("/api/auth/google-login", {
        token: tokenResponse.access_token,
      });
      const data = await res.data;
      if (data.error) throw new Error(data.error);

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
