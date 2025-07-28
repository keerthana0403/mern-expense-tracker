import { useEffect, useState } from "react";

import ExpenseForm from "../../components/ExpenseForm";
import Statistics from "./Statistics";
import ExpenseList from "./ExpenseList";
import Header from "../../components/Header";
import useGetExpenses from "../../hooks/useGetExpenses";
import DashBoard from "./DashBoard";
import ExpenseFilter from "../../components/ExpenseFilter";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const { loading, expenses } = useGetExpenses();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const handleFilter = ({ month, year }) => {
    if (!month || !year) {
      setFilteredExpenses(expenses);
      return;
    }

    const filtered = expenses.filter((expense) => {
      const date = new Date(expense.date); // Assuming `expense.date` is ISO string
      return (
        date.getMonth() + 1 === Number(month) &&
        date.getFullYear() === Number(year)
      );
    });

    setFilteredExpenses(filtered);
  };

  const totalIncome = filteredExpenses
    .filter((expense) => expense?.type === "income")
    .reduce((acc, expense) => (acc += expense?.amount), 0);
  const totalExpenses = filteredExpenses
    .filter((expense) => expense?.type === "expense")
    .reduce((acc, expense) => (acc += expense?.amount), 0);
  const balance = totalIncome - totalExpenses;

  const getTopCategories = (data, topN = 3) => {
    const categoryMap = {};

    data.forEach(({ name, amount }) => {
      categoryMap[name] = (categoryMap[name] || 0) + amount;
    });

    const sorted = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

    const top = sorted.slice(0, topN);
    const others = sorted.slice(topN);

    const topCategories = top.map(([name, amount]) => ({ name, amount }));
    const othersTotal = others.reduce((acc, [, amount]) => acc + amount, 0);

    if (othersTotal > 0) {
      topCategories.push({ name: "Others", amount: othersTotal });
    }

    return topCategories;
  };

  const categoryData = getTopCategories(
    filteredExpenses
      .filter((expense) => expense.type === "expense")
      .map((expense) => ({ name: expense.category, amount: expense.amount }))
  );

  useEffect(() => {
    if (expenses.length > 0) {
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      const filtered = expenses.filter((expense) => {
        const date = new Date(expense.date);
        return (
          date.getMonth() + 1 === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

      setFilteredExpenses(filtered);
    }
  }, [expenses]);

  return (
    <div className="min-h-screen flex justify-center ">
      <div className="">
        <Header />
        <DashBoard
          setShowModal={setShowModal}
          income={totalIncome}
          expense={totalExpenses}
          balance={balance}
        />
        <ExpenseFilter onFilter={handleFilter} />
        {expenses.length === 0 ? (
          <TextContent />
        ) : filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-500 my-4">
            No records for this month.
          </p>
        ) : (
          <Statistics
            categoryData={categoryData}
            income={totalIncome}
            expense={totalExpenses}
          />
        )}

        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : expenses.length === 0 ? (
          <></>
        ) : (
          <ExpenseList records={expenses.slice(0, 3)} />
        )}
        {showModal && <ExpenseForm setShowModal={setShowModal} edit={false} />}
      </div>
    </div>
  );
};

export default Home;

const TextContent = () => {
  return (
    <div className="text-center text-gray-600 my-10 ">
      <h2 className="text-xl font-semibold">Welcome to Expenso!</h2>
      <p className="mt-2">
        Track your income and expenses to better manage your money.
      </p>

      <img
        src="https://thumbs.dreamstime.com/b/expense-tracker-tool-customizable-spending-categories-option-to-create-subbudgets-specific-events-321568324.jpg"
        alt="No records yet"
        className="w-34 h-34 mx-auto my-6 opacity-60"
      />

      <button
        // onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
      >
        + Add Your First Expense
      </button>

      <ul className="mt-6 text-sm text-gray-500 list-disc list-inside">
        <li>Add income or expenses</li>
        <li>Filter by month/year</li>
        <li>Analyze your spending with statistics</li>
      </ul>
    </div>
  );
};
