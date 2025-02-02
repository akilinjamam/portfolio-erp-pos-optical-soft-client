/* eslint-disable react/prop-types */
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend} from 'chart.js'

import { Bar } from "react-chartjs-2";

const ProfitExpenseAnalysisChart = ({analysisData}) => {

  const totalExp = analysisData?.totalExpenses + analysisData?.fixedExpenses;
  const netProfit = analysisData?.totalProfit - (analysisData?.totalExpenses + analysisData?.fixedExpenses)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );


      const data = {
        labels: ['Total Profit', 'Total Expenses', 'Net Profit'],
        datasets: [
          {
            label: 'Profit Expense',
            data: [analysisData?.totalProfit, totalExp, netProfit],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)', 
                'rgba(255, 159, 64, 0.7)',
                'rgba(117, 173, 247, 0.7)'
            ],
            fill: true,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Profit (excluding fixed cost) vs Expenses Analysis",
          },
          datalabels: {
            color: "black", 
            anchor: "end", 
            align: "top",
            font: {
              weight: "bold",
              size: 12,
            },
            formatter: (value) => value || "0", // Display "0" for empty values
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    return (
        <div style={{height: '62vh'}}>
            <Bar style={{width:'100%'}} data={data} options={options} />
        </div>
    );
};

export default ProfitExpenseAnalysisChart;