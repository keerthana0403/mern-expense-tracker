import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import TransactionList from "./TransactionList";
import { ArrowLeftCircle } from "lucide-react";
import useGetExpenses from "../../hooks/useGetExpenses";
import { useState } from "react";
import ExpenseForm from "../../components/ExpenseForm";

const TransactionPage = () => {
  const navigate = useNavigate();

  const { expenses, loading } = useGetExpenses();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-h-screen">
      <div className="navbar bg-base-100 shadow-md flex gap-5 items-center mb-5">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftCircle />
        </button>
        <h2 className="text-2xl font-bold">Transaction History</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select className="select select-bordered w-full md:w-1/3">
          <option value="">All Months</option>
        </select>
        <Input
          type="text"
          placeholder="Search by Category"
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <TransactionList transactions={expenses} setShowModal={setShowModal} />
      )}
      {showModal && <ExpenseForm setShowModal={setShowModal} edit={true} />}
    </div>
  );
};

export default TransactionPage;
