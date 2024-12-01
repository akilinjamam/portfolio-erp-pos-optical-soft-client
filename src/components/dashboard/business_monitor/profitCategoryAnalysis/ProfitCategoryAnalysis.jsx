// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import profitCatAnalysis from './ProfitCategoryAnalysis.module.scss';
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
import CommonLoading from '../../../commonLoagin/CommonLoading';

const ProfitCategoryAnalysis = () => {
    
    const {profitExpenseData, isLoading } = useGetProfitExpenseAccountsData();

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
                position: 'top',
            },
            title: {
                display: true,
                text: 'Profit Category Analysis',
            },
        },
    };

    if(isLoading){
        return <CommonLoading/>
    }
   
    return (
        <div  className={`${profitCatAnalysis.main} full_width`}>
             <div style={{display:'flex'}}  className={`flex_around`}>
                <div className={`${profitCatAnalysis.inputAreaOne} flex_center`}>
                  <div className={`${profitCatAnalysis.container} `}>
                        <div className={`${profitCatAnalysis.titleName}`}>Profit Category Analysis</div>
                        <div style={{width: '193px' }}  className={`${profitCatAnalysis.border_remover} `}></div>

                      <form action="">
                            <div className='flex_top'>
                              
                              <div style={{width:'49%'}}>
                                
                              </div>
                            </div>
                      
                            <div className={`${profitCatAnalysis.inputAreaOne_footer} flex_right`}>
                                  <div className={`${profitCatAnalysis.inputAreaOne_footer_container} flex_around`}>                                            
                                                 
                                  </div>
                            </div>
                      </form>
                  </div>
                </div>
                <div className={`${profitCatAnalysis.inputAreaTwo} flex_center`}>
                  <div className={`${profitCatAnalysis.container} `}>
                        <div className={`${profitCatAnalysis.titleName} flex_center`}>Details</div>
                        <div style={{width: '65px'}} className={`${profitCatAnalysis.border_remover}`}></div>
                        <br />
                            <div className={`${profitCatAnalysis.inputAreaTwoContainer}`}>
                           
                                  

                                  <div className={`${profitCatAnalysis.uploading}`}>
                                     
                                  </div>
                                  
                            </div>
                  </div>
                </div>
              </div>
          <section className={`${profitCatAnalysis.navigationIcon} flex_between`}>
                { 
                <div className={`${profitCatAnalysis.inputPart} flex_left`}>
                    <i title="print" className="uil uil-print"></i>
                    
                   
                </div>
                }
                
          </section>
          <section className={`${profitCatAnalysis.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '62vh'}}  className={`${profitCatAnalysis.tableArea}`}>
              <Bar style={{width:'100%'}} data={data} options={options} />
          </section>
             
        </div>
    );
};

export default ProfitCategoryAnalysis;