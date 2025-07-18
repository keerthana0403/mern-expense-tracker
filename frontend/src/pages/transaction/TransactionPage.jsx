import Input from "../../components/Input";
import TransactionList from "./TransactionList";
import { ArrowLeftCircle } from "lucide-react";

const transactions = [
  {
    _id: "1",
    type: "income",
    category: "Salary",
    amount: 45000,
    paymentMethod: "Bank Transfer",
    date: "2025-07-10",
  },
  {
    _id: "2",
    type: "expense",
    category: "Groceries",
    amount: 2500,
    paymentMethod: "Credit Card",
    date: "2025-07-12",
  },
  {
    _id: "3",
    type: "expense",
    category: "Internet",
    amount: 1000,
    paymentMethod: "UPI",
    date: "2025-07-14",
  },
  {
    _id: "4",
    type: "income",
    category: "Freelance",
    amount: 12000,
    paymentMethod: "UPI",
    date: "2024-06-15",
  },
];

const TransactionPage = () => {
  return (
    <div className="min-h-screen overflow-auto">
      <div className="navbar bg-base-100 shadow-md flex gap-5 items-center mb-5">
        <ArrowLeftCircle />
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

      <TransactionList transactions={transactions} />
    </div>
  );
};

export default TransactionPage;
