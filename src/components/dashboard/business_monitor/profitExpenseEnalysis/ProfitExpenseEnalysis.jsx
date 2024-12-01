// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import profitExpenseEnalaysis from './ProfitExpenseEnalysis.module.scss';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend} from 'chart.js'
import useGetProfitExpenseAccountsData from '../../../../data/accountsData/useGetProfitExpenseAccountsData';

const ProfitExpenseEnalysis = () => {
    
    const {profitExpenseData } = useGetProfitExpenseAccountsData();

    const analysisData = profitExpenseData?.result
    console.log(analysisData);
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
        labels: ['Total Profit', 'Total Expenses'],
        datasets: [
          {
            label: 'Profit Expense',
            data: [analysisData?.totalProfit, analysisData?.totalExpenses],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)', 
                'rgba(255, 159, 64, 0.7)'
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
                position: 'top',
            },
            title: {
                display: true,
                text: 'Profit vs Expense Analysis',
            },
        },
    };

   
    return (
        <div  className={`${profitExpenseEnalaysis.main} full_width`}>
             <div style={{display:'flex'}}  className={`flex_around`}>
                <div className={`${profitExpenseEnalaysis.inputAreaOne} flex_center`}>
                  <div className={`${profitExpenseEnalaysis.container} `}>
                        <div className={`${profitExpenseEnalaysis.titleName}`}>Profit Expense Analysis</div>
                        <div style={{width: '193px' }}  className={`${profitExpenseEnalaysis.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${profitExpenseEnalaysis.inputAreaOne_footer} flex_right`}>
                                  <div className={`${profitExpenseEnalaysis.inputAreaOne_footer_container} flex_around`}>                                            
                                                 
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
                <div className={`${profitExpenseEnalaysis.inputAreaTwo} flex_center`}>
                  <div className={`${profitExpenseEnalaysis.container} `}>
                        <div className={`${profitExpenseEnalaysis.titleName} flex_center`}>Details</div>
                        <div style={{width: '65px'}} className={`${profitExpenseEnalaysis.border_remover}`}></div>
                        <br />
                            <div className={`${profitExpenseEnalaysis.inputAreaTwoContainer}`}>
                           
                                  

                                  <div className={`${profitExpenseEnalaysis.uploading}`}>
                                     
                                  </div>
                                  
                            </div>
                  </div>
                </div>
              </div>
          <section className={`${profitExpenseEnalaysis.navigationIcon} flex_between`}>
                { 
                <div className={`${profitExpenseEnalaysis.inputPart} flex_left`}>
                    <i title="print" className="uil uil-print"></i>
                    
                   
                </div>
                }
                
          </section>
          <section className={`${profitExpenseEnalaysis.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '62vh'}}  className={`${profitExpenseEnalaysis.tableArea}`}>
              <Bar style={{width:'100%'}} data={data} options={options} />
          </section>
             
        </div>
    );
};

export default ProfitExpenseEnalysis;