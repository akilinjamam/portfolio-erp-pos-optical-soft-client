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
import ChartDataLabels from 'chartjs-plugin-datalabels'

const ProfitCategoryAnalysisChart = ({analysisData}) => {


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ChartDataLabels
      );


      const data = {
        labels: ['Cash', 'Bank', 'Bkash', 'Nogod', 'Rocket'],
        datasets: [
          {
            label: 'Sales',
            data: [analysisData?.cashProfit, analysisData?.bankProfit, analysisData?.bkashProfit, analysisData?.nogodProfit, analysisData?.rocketProfit ],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)', 
                'rgba(255, 159, 64, 0.7)', 
                'rgba(153, 102, 255, 0.7)',
                'rgba(253, 102, 255, 0.7)',
                'rgba(753, 102, 255, 0.7)',
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
            text: "Monthly Profit (excluding fixed cost) Category Analysis",
          },
          datalabels: {
            color: "black", 
            anchor: "end", 
            align: "top",
            font: {
              weight: "bold",
              size: 12,
            },
            formatter: (value) => value || "0",
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

export default ProfitCategoryAnalysisChart;