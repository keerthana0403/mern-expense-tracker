import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user-info"));

      const res = user?.isGuest
        ? await fetch("/api/auth/guest-logout", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id }),
          })
        : await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });

      const data = await res.json();
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
