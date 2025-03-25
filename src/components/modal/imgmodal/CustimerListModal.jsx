/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import imgmodal from './ImgModal.module.scss';
import CustomerListTable from '../../dashboard/administration_module/customer_list/CutomerListTable';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ReportTitle from '../../../ReportTitle/ReportTitle';

const CustomerListModal = ({open, type, dispatch, closeModal }) => {

   const customerListData = useSelector(state => state.imgModal.salesData)
  
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'customerList' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeStock}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Customer Data : {customerListData?.length} </button>
                        <button 
                        onClick={() => {
                            handlePrint(null, () => contentToPrint.current);
                            }} 
                        className={imgmodal.stockPrintBtn}>Print  <i title="print" className="uil uil-print"></i></button>
                        </div>
                        <i 
                        onClick={() => dispatch(closeModal())} 
                        className="uil uil-times"></i>
                    </div>
                    <div ref={contentToPrint} style={{marginTop:'10px'}}  className={`${imgmodal.stockContainer}`}>
                        <ReportTitle/>
                        <CustomerListTable paginatedDataContainer={customerListData} />
                    </div>        
                </section>
        </div>
    );
};

export default CustomerListModal;