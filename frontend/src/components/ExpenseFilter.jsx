import React, { useEffect, useState } from "react";
import Button from "./Button";

const ExpenseFilter = ({ onFilter }) => {
  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));

  useEffect(() => {
    onFilter({ month, year }); // Run onFilter on mount
  }, []);

  const handleFilter = () => {
    onFilter({ month, year });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center p-4 w-full">
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="select select-bordered w-1/3"
      >
        <option value="">Select Month</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="select select-bordered w-1/3"
      >
        <option value="">Select Year</option>
        {["2023", "2024", "2025", "2026"].map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>

      <Button
        onClick={handleFilter}
        className="btn btn-primary btn-md w-1/3"
        children={"Filter"}
      />
    </div>
  );
};

export default ExpenseFilter;
