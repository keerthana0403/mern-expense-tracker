const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4 ">
      {/* Left: App Name */}
      <div className="flex-1">
        <a className="text-2xl font-bold text-emerald-700" href="/">
          Expenso
        </a>
      </div>

      {/* Center: Navigation */}
      <div className="mx-2">
        <button
          className="btn btn-sm btn-soft btn-info text-sm"
          //   onClick={() => navigate("/transactions")}
        >
          Transactions
        </button>
      </div>

      {/* Right: Logout */}
      <div className="flex-none">
        <button className="btn btn-sm btn-error text-white">Logout</button>
      </div>
    </div>
  );
};

export default Header;
