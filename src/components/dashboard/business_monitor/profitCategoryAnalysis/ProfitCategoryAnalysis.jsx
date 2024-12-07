// import { updloadCloudinaryImage } from "../../../uploadCloudinaryImg";
import profitCatAnalysis from './ProfitCategoryAnalysis.module.scss';

import useGetProfitExpenseAccountsData from '../../../../data/accountsData/useGetProfitExpenseAccountsData';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import ProfitCategoryAnalysisChart from './ProfitCategoryAnalysisChart';
import { useDispatch } from 'react-redux';
import { addAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';

const ProfitCategoryAnalysis = () => {

  const { profitExpenseData, isLoading } = useGetProfitExpenseAccountsData();

  const analysisData = profitExpenseData?.result

  const dispatch = useDispatch();


  if (isLoading) {
    return <CommonLoading />
  }

  return (
    <div className={`${profitCatAnalysis.main} full_width`}>
      <div style={{ display: 'flex' }} className={`flex_around`}>
        <div className={`${profitCatAnalysis.inputAreaOne} flex_center`}>
          <div className={`${profitCatAnalysis.container} `}>
            <div className={`${profitCatAnalysis.titleName}`}>Profit Category Analysis</div>
            <div style={{ width: '193px' }} className={`${profitCatAnalysis.border_remover} `}></div>

            <form action="">
              <div className='flex_top'>

                <div style={{ width: '49%' }}>

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
            <div style={{ width: '65px' }} className={`${profitCatAnalysis.border_remover}`}></div>
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
            <i title="print" className="uil uil-print" onClick={() => {
              dispatch(openModal('analysis'))
              dispatch(addAnalysis({ data: analysisData }))
            }}></i>


          </div>
        }

      </section>
      <section className={`${profitCatAnalysis.navigationIcon} only_flex`}>


      </section>
      <section className={`${profitCatAnalysis.tableArea}`}>
        <ProfitCategoryAnalysisChart analysisData={analysisData} />
      </section>

    </div>
  );
};

export default ProfitCategoryAnalysis;