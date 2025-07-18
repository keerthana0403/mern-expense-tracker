import React from "react";
import ExpenseForm from "../../components/ExpenseForm";
import Statistics from "./Statistics";
import ExpenseList from "./ExpenseList";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div className="max-h-screen px-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {/* Statistics */}
        {/* <Suspense fallback={<div className="skeleton h-48 w-full"></div>}> */}
        <Statistics />
        {/* </Suspense> */}

        {/* Form + Records */}
        <div className="space-y-6">
          <ExpenseForm />
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default Home;
