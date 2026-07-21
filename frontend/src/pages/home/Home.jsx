import { useEffect, useState } from "react";

import ExpenseForm from "../../components/ExpenseForm";
import Statistics from "./Statistics";
import ExpenseList from "./ExpenseList";
import Header from "../../components/Header";
import useGetExpenses from "../../hooks/useGetExpenses";
import DashBoard from "./DashBoard";
import ExpenseFilter from "../../components/ExpenseFilter";
import { MonthlyIncome, MonthlyRecord, TextContent } from "./Placeholders";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const { loading, expenses } = useGetExpenses();
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const handleFilter = ({ month, year }) => {
    if (!month || !year) {
      setFilteredExpenses(expenses);
      return;
    }

    const filtered = expenses.filter((expense) => {
      const date = new Date(expense.date);
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
  }, [expenses]);

  return (
<div className="min-h-screen flex justify-center">
  <div>
    <Header />

    <DashBoard
      setShowModal={setShowModal}
      income={totalIncome}
      expense={totalExpenses}
      balance={balance}
    />

    {loading ? (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ) : (
      <>
        {expenses.length !== 0 && (
          <ExpenseFilter onFilter={handleFilter} />
        )}

        {expenses.length === 0 ? (
          <TextContent setShowModal={setShowModal} />
        ) : filteredExpenses.length === 0 ? (
          <MonthlyRecord />
        ) : totalExpenses === 0 ? (
          <MonthlyIncome totalIncome={totalIncome} />
        ) : (
          <Statistics
            categoryData={categoryData}
            income={totalIncome}
            expense={totalExpenses}
          />
        )}

        {expenses.length !== 0 && (
          <ExpenseList records={expenses.slice(0, 3)} />
        )}
      </>
    )}

    {showModal && (
      <ExpenseForm setShowModal={setShowModal} edit={false} />
    )}
  </div>
</div>
  );
};

export default Home;
