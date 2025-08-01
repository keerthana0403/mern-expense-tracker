import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import TransactionList from "./TransactionList";
import { ArrowLeftCircle } from "lucide-react";
import useGetExpenses from "../../hooks/useGetExpenses";
import { useEffect, useState } from "react";
import ExpenseForm from "../../components/ExpenseForm";
import UserCard from "./UserCard";
import { useAuthContext } from "../../context/AuthContext";
// import { categories } from "../../constants/categories";

const TransactionPage = () => {
  const navigate = useNavigate();

  const { expenses, loading } = useGetExpenses();

  const [showModal, setShowModal] = useState(false);

  const [filteredData, setFilteredData] = useState(expenses);

  const { authUser } = useAuthContext();

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filterByDate = (expenses, fromDate, toDate) => {
    if (!fromDate && !toDate) return expenses;

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      if (from && to) return expenseDate >= from && expenseDate <= to;
      if (from) return expenseDate >= from;
      if (to) return expenseDate <= to;

      return true;
    });
  };

  useEffect(() => {
    const filtered = filterByDate(expenses, filters.fromDate, filters.toDate);
    setFilteredData(filtered);
  }, [expenses, filters]);

  console.log(authUser);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="">
        <div className="navbar bg-base-100 shadow-md flex gap-5 items-center mb-5 ">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftCircle />
          </button>
          <h2 className="text-2xl font-bold">Transaction History</h2>
        </div>

        <div className="my-5">
          {/* User Info Card */}
          {authUser && (
            <UserCard
              firstName={authUser.firstName}
              lastName={authUser.lastName}
              email={authUser.email}
              date={authUser.createdAt}
            />
          )}
        </div>

        <div className="flex items-center space-x-2 mb-5">
          <>
            <span className="text-gray-500">From</span>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterChange}
              className="input input-bordered"
            />
          </>
          <>
            <span className="text-gray-500">To</span>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleFilterChange}
              className="input input-bordered "
            />
          </>
        </div>

        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <TransactionList
            transactions={filteredData}
            setShowModal={setShowModal}
          />
        )}
        {showModal && <ExpenseForm setShowModal={setShowModal} edit={true} />}
      </div>
    </div>
  );
};

export default TransactionPage;
