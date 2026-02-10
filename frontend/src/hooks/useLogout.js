import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import API from "../api/api";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user-info"));

      const res = user?.isGuest
        ? await API.post("/api/auth/guest-logout", { userId: user._id })
        : await API.post("/api/auth/logout", {});

      const data = await res.data;
      if (data.error) throw new Error(data.error);
      localStorage.removeItem("user-info");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
