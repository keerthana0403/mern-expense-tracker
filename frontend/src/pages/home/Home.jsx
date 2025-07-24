import React, { useState } from "react";
import ExpenseForm from "../../components/ExpenseForm";
import Statistics from "./Statistics";
import ExpenseList from "./ExpenseList";
import Header from "../../components/Header";
import useGetExpenses from "../../hooks/useGetExpenses";
import DashBoard from "./DashBoard";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const { loading, expenses } = useGetExpenses();

  const totalIncome = expenses
    .filter((expense) => expense?.type === "income")
    .reduce((acc, expense) => (acc += expense?.amount), 0);
  const totalExpenses = expenses
    .filter((expense) => expense?.type === "expense")
    .reduce((acc, expense) => (acc += expense?.amount), 0);
  const balance = totalIncome - totalExpenses;

  const getTopCategories = (data, topN = 5) => {
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
    expenses
      .filter((expense) => expense.type === "expense")
      .map((expense) => ({ name: expense.category, amount: expense.amount }))
  );

  // const categoryData = expenses
  //   .filter((expense) => expense.type === "expense")
  //   .map((expense) => ({ name: expense.category, amount: expense.amount }));

  return (
    <div className="flex-col items-center justify-center max-h-screen">
      <Header />

      <DashBoard
        setShowModal={setShowModal}
        income={totalIncome}
        expense={totalExpenses}
        balance={balance}
      />
      <Statistics
        categoryData={categoryData}
        income={totalIncome}
        expense={totalExpenses}
      />
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <ExpenseList records={expenses.slice(0, 3)} />
      )}

      {showModal && <ExpenseForm setShowModal={setShowModal} edit={false} />}
    </div>
  );
};

export default Home;
