import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import API from "../api/api";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ firstName, lastName, email, password }) => {
    const success = handleInputErrors({
      firstName,
      lastName,
      email,
      password,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await API.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      const data = await res.data;
      if (data.error) throw new Error(data.error);
      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    toast.error("Please fill all the details");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }
  return true;
};
