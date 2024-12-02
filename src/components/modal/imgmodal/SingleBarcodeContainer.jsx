/* eslint-disable react/prop-types */
import Barcode from 'react-barcode';
import '../../../global_style/global_style.css';
import imgmodal from './ImgModal.module.scss'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const SingleBarcodeContainer = ({open, type, barcode, dispatch, closeModal}) => {

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });


    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'single-barcode' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeBarcode}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Barcode :{barcode?.barcode}</button>
                        <button 
                        onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                        }} 
                        className={imgmodal.barcodePrintBtn}>Print  <i title="print" className="uil uil-print"></i></button>
                        </div>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                            
                    <br />
                    <div  style={{ display: 'flex', flexWrap: 'wrap'}} ref={contentToPrint} className={`${imgmodal.SinglebarcodeContainer}`}>
                        <div style={{ textAlign:'center',}}>
                            <Barcode format='CODE128'  fontSize="16px"  width={1.1} height={29} value={barcode?.barcode}/>
                        </div>
                    </div>
                </section>
        </div>
    );
};

export default SingleBarcodeContainer;