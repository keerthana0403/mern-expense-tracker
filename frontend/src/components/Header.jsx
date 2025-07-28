import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { loading, logout } = useLogout();
  return (
    <div className="navbar bg-base-100 shadow-md px-4 ">
      {/* Left: App Name */}
      <div className="flex-1">
        <Link to={"/"} className="text-2xl font-bold text-emerald-700">
          Expenso
        </Link>
      </div>

      {/* Center: Navigation */}
      <div className="mx-2">
        <Button
          className="btn btn-sm btn-soft btn-info text-sm"
          onClick={() => navigate("/transactions")}
          children={"Transactions"}
        />
      </div>

      {/* Right: Logout */}
      <div className="flex-none">
        <Button
          className="btn btn-sm btn-error text-white"
          disabled={loading}
          onClick={logout}
          children={
            !loading ? (
              "Logout"
            ) : (
              <span className="loading loading-spinner"></span>
            )
          }
        />
      </div>
    </div>
  );
};

export default Header;
