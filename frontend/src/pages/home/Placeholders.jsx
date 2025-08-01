export const TextContent = ({ setShowModal }) => {
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
        onClick={() => setShowModal(true)}
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

export const MonthlyRecord = () => {
  return (
    <div className="h-50 flex flex-col items-center justify-center">
      <p className="text-center text-gray-500 my-4">
        No records for this month.
      </p>
    </div>
  );
};

export const MonthlyIncome = ({ totalIncome }) => {
  return (
    <div className="h-50 flex flex-col items-center justify-center">
      <p className="text-center text-gray-500 my-2">{`You’ve added ₹${totalIncome} income so far.`}</p>
      <p className="text-center text-gray-500 my-2">
        No expenses yet — great start!
      </p>
    </div>
  );
};
