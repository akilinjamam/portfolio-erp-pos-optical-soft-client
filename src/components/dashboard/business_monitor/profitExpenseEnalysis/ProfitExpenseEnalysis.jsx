// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import profitExpenseEnalaysis from './ProfitExpenseEnalysis.module.scss';


import useGetProfitExpenseAccountsData from '../../../../data/accountsData/useGetProfitExpenseAccountsData';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import ProfitExpenseAnalysisChart from './ProfitExpenseAnalysisChart';
import { useDispatch } from 'react-redux';
import { addAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';

const ProfitExpenseEnalysis = () => {
    
    const {profitExpenseData, isLoading } = useGetProfitExpenseAccountsData();

    const dispatch = useDispatch();

    if(isLoading){
        return <CommonLoading/>
    }
   
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
                    <i onClick={() => {
                      dispatch(openModal('profit-expense-analysis'))
                      dispatch(addAnalysis({data:profitExpenseData?.result}))
                    }} title="print" className="uil uil-print"></i>
                  
                </div>
                }
                
          </section>
          <section className={`${profitExpenseEnalaysis.navigationIcon} only_flex`}>
          
                
          </section>
          <section style={{height: '62vh'}}  className={`${profitExpenseEnalaysis.tableArea}`}>
              <ProfitExpenseAnalysisChart style={{width:'100%'}} analysisData={profitExpenseData?.result} />
          </section>
             
        </div>
    );
};

export default ProfitExpenseEnalysis;