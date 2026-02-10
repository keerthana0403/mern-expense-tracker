import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import API from "../api/api";

const useGuestLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const guestLogin = async () => {
    setLoading(true);

    try {
      const res = await API.post("/api/auth/guest-login", {});

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, guestLogin };
};

export default useGuestLogin;
