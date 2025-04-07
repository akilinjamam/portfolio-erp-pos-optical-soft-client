/* eslint-disable react/prop-types */
import { useRef } from 'react';
import '../../../global_style/global_style.css'
import imgmodal from './ImgModal.module.scss';
import { useReactToPrint } from 'react-to-print';

import VendorListTable from '../../dashboard/accounts_module/VendorList/VendorlistTable';
import useVendorList from '../../dashboard/accounts_module/VendorList/useVendorList';
import ReportTitle from '../../../ReportTitle/ReportTitle';

const VendorModal = ({type, open, dispatch, closeModal, vendorData}) => {

    const {totalPaid} = useVendorList();

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    
    
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'vendor' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeStock}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Vendor Data : {vendorData?.length} </button>
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
                    <div style={{marginTop:'10px'}} ref={contentToPrint} className={`${imgmodal.stockContainer}`}>
                        <ReportTitle/>
                        <VendorListTable  paginatedDataContainer={vendorData} totalPaid={totalPaid} hideField={true}/>
                    </div>        
                </section>
        </div>
    );
};

export default VendorModal;