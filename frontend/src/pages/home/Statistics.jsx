import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

const Statistics = ({ categoryData, income, expense }) => {
  const total = income + expense;

  // Group category data and sum amounts
  const grouped = categoryData.reduce((acc, curr) => {
    acc[curr.name] = (acc[curr.name] || 0) + curr.amount;
    return acc;
  }, {});

  const categories = Object.entries(grouped).map(([name, amount]) => ({
    name,
    amount,
    percentage: ((amount / expense) * 100).toFixed(2),
  }));

  const chartColors = [
    "#f87171",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#fb923c",
    "#4ade80",
    "#c084fc",
    "#f472b6",
    "#818cf8",
    "#facc15",
    "#38bdf8",
    "#f43f5e",
    "#10b981",
    "#e879f9",
  ];

  const data = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map((cat) => cat.amount),
        backgroundColor: chartColors.slice(0, categories.length),
        hoverOffset: 4,
        borderRadius: 0,
        spacing: 3,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (ctx) {
            const amount = ctx.raw;
            return `${ctx.label}: ₹${amount}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  const totalPercentage = ((expense / total) * 100).toFixed(2);

  return (
    <div className="p-6 w-full">
      {/* Doughnut Chart with Center Text */}
      <div className="relative w-full h-60">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-base-content/60 font-semibold">Expense</p>
          <p className="text-xl font-bold text-rose-600">{totalPercentage}%</p>
        </div>
      </div>

      {/* Overview Divider */}
      <div className="divider my-6">Overview</div>

      <div className="flex flex-col gap-2 w-full">
        {categories.map((cat, index) => {
          const percent = total ? ((cat.amount / total) * 100).toFixed(1) : 0;
          return (
            <div
              key={cat.name}
              className="flex items-center justify-between bg-base-200 rounded-md p-3 w-full"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                ></span>
                <span className="text-sm font-medium text-base-content/80 truncate">
                  {cat.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-base-content/70">
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;

// const IncomeVsExpensesChart = ({ income, expense }) => {
//   const data = {
//     labels: ["Income", "Expenses"],
//     datasets: [
//       {
//         label: "Amount (₹)",
//         data: [income, expense],
//         backgroundColor: ["#4caf50", "#f44336"],
//         borderRadius: 8,
//       },
//     ],
//   };
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `₹${context.raw}`;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function (value) {
//             return `₹${value}`;
//           },
//         },
//       },
//     },
//   };
//   return (
//     <div className="card ">
//       <div className="card-body">
//         <h2 className="card-title">📈 Income vs Expenses</h2>
//         <div className="h-64">
//           <Bar data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };
