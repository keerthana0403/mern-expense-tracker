import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const Statistics = ({ totalExpense = 10000, totalIncome = 50000 }) => {
  const total = totalExpense + totalIncome;
  const incomePercentage = total ? (totalIncome / total) * 100 : 0;
  const expensesPercentage = total ? (totalExpense / total) * 100 : 0;

  const chartColors = total ? ["#0B4251", "#F2C864"] : ["#d3d3d3", "#d3d3d3"];

  const data = {
    datasets: [
      {
        data: [incomePercentage, expensesPercentage],
        backgroundColor: chartColors,
        hoverOffset: 4,
        borderRadius: 30,
        spacing: 10,
      },
    ],
  };

  const options = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) {
      return "Invalid amount";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className=" p-6 w-full h-full">
      <div className="relative w-full h-60">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-base-content/60 font-semibold">Balance</p>
          <p className="text-xl font-bold text-emerald-700">
            {formatCurrency(totalIncome - totalExpense)}
          </p>
        </div>
      </div>

      <div className="divider my-6">Overview</div>

      <div className="space-y-3">
        {/* Income Row */}
        <div className="flex justify-between items-center bg-base-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: chartColors[0] }}
            ></span>
            <span className="text-base font-medium text-base-content/80">
              Income
            </span>
          </div>
          <span className="font-bold text-base-content/70">
            {incomePercentage.toFixed(2)}%
          </span>
        </div>

        {/* Expense Row */}
        <div className="flex justify-between items-center bg-base-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: chartColors[1] }}
            ></span>
            <span className="text-base font-medium text-base-content/80">
              Expenses
            </span>
          </div>
          <span className="font-bold text-base-content/70">
            {expensesPercentage.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
