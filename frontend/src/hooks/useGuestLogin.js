import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGuestLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const guestLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/guest-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

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
