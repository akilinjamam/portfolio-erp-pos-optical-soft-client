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

import { Bar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { calculateTotalPrice } from '../../../calculation/calculateSum';

const StockAnalysisChartRes = ({analysisData, categoryWiseAvailableQuantity, categoryWiseTotalQuantity, categoryWiseStockOunt, categoryName}) => {

    const totalAvailableProduct = calculateTotalPrice(analysisData?.map(item => Number(item?.quantity)));
    const totalProduct = calculateTotalPrice(analysisData?.map(item => Number(item?.stockAmount)));
    const totalStockOut = totalProduct - totalAvailableProduct;
    
   
    console.log([...new Set(analysisData?.map(product => product?.category))]);

    const categoryCount = analysisData?.reduce((acc, item) => {
        acc[item?.category] = (acc[item?.category] || 0) + Number(item?.quantity);
        return acc;
      }, {});
      
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
        labels: ['Total Stock', 'Available Stock', 'Stock Out'],
        datasets: [
          {
            label: 'Stock Analysis',
            data: [totalProduct, totalAvailableProduct, totalStockOut ],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)', 
                'rgba(255, 159, 64, 0.7)', 
                'rgba(153, 102, 255, 0.7)',
                'rgba(253, 102, 255, 0.7)',
            ],
            fill: true,
          },
        ],
      };
      const dataCategoryWishCount = {
        labels: Object?.keys(categoryCount),
        datasets: [
          {
            label: 'Category Wise Available Stock',
            data: Object?.values(categoryCount),
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
        labels: ['Available Stock', 'Total Stock', 'Stock Out'],
        datasets: [
          {
            label: 'Category Wise Stock Details',
            data: [categoryWiseAvailableQuantity, categoryWiseTotalQuantity, categoryWiseStockOunt],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [ 
                'rgba(153, 202, 255, 0.7)',
                'rgba(253, 102, 255, 0.7)',
                'rgba(253, 602, 155, 0.7)',
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
            text: "Stock Overview",
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
            text: "Category Wise Available Stock ",
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
            text: `Stock Details: ${categoryName}`,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    return (
        <div style={{height: '62vh', overflowY: "scroll"}}>
            <div >
                <div style={{width:'100%', marginBottom: "10px"}}>
                    <Bar style={{width:'100%'}} data={dataCategoryWishCount} options={optionsCategoryWiseQunatity} />
                </div>
                <div style={{width:'100%'}}>
                    <Doughnut style={{width:'100%'}} data={dataCategoryWishDetail} options={optionsCategoryWiseDetail} />
                </div>
               
            </div>
            <div >
                <Bar style={{width:'100%'}} data={data} options={options} />
            </div>       
        </div>
    );
};

export default StockAnalysisChartRes;