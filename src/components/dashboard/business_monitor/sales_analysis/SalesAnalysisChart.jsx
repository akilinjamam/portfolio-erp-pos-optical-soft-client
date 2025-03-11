/* eslint-disable react/prop-types */
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend} from 'chart.js'

import { Bar, Doughnut, Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'

const SalesAnalysisChart = ({ allSalesPriceData, highestSale, lowestSale, netSales, totalDiscount, totalDue, totalPaid}) => {

    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        LineElement,
        ArcElement,
        RadialLinearScale,
        
        Title,
        Tooltip,
        Legend,
        ChartDataLabels
      );


      const data = {
        labels: allSalesPriceData?.map(item => item?.date),
        datasets: [
          {
            label: "Sales Analysis",
            data: allSalesPriceData?.map(item => item?.sales),
            borderColor: "rgba(75, 192, 192, 1)", 
            backgroundColor: "green", 
            tension: 0.3, 
            pointRadius: 5, 
            fill: true, 
          },
        ],
      };
      
      const dataCategoryWishCount = {
        labels: [highestSale?.date, lowestSale?.date],
        datasets: [
          {
            label: '',
            data: [highestSale?.sales, lowestSale?.sales],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [ 
                'rgba(153, 202, 255, 0.7)',
                'rgba(253, 102, 255, 0.7)',
            ],
            fill: true,
          },
        ],
      };
      const dataCategoryWishDetail = {
        labels: [`Total Sales(excluding discount: ${totalDiscount})`, 'Total Paid', 'Total Due'],
        datasets: [
          {
            label: '',
            data: [netSales, totalPaid, totalDue],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [ 
                'rgba(39, 208, 245, 0.7)',
                'rgba(253, 102, 115, 0.7)',
                'rgba(253, 702, 155, 0.7)',
               
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
            display: false,
            position: "top",
          },
          title: {
            display: true,
            text: "Sales Overview",
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
      const optionsCategoryWiseQunatity = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: true,
            text: "Highest and Lowest Sales",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      const optionsCategoryWiseDetail = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Sales Details`,
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
            <div className='only_flex' style={{height: '25vh'}}>
                <div style={{width:'50%'}}>
                    <Bar style={{width:'100%'}} data={dataCategoryWishCount} options={optionsCategoryWiseQunatity} />
                </div>
                <div style={{width:'50%'}}>
                    <Doughnut style={{width:'100%'}} data={dataCategoryWishDetail} options={optionsCategoryWiseDetail} />
                </div>
               
            </div>
            <div style={{height: '37vh', width: '100%'}}>
                <Line style={{width:'90%'}} data={data} options={options} />
            </div>       
        </div>
    );
};

export default SalesAnalysisChart;