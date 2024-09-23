/* eslint-disable react/prop-types */
import Barcode from 'react-barcode';
import '../../../global_style/global_style.css';
import imgmodal from './ImgModal.module.scss'

const BarcodeContainer = ({open, type, barcode, handlePrint, contentToPrint, dispatch, closeModal}) => {
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'barcode' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeBarcode}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>
                        <button>Total Barcode :{barcode?.length}</button>
                        <button 
                        onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                        }} 
                        className={imgmodal.barcodePrintBtn}>Print  <i title="print" className="uil uil-print"></i></button>
                        </div>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <div  style={{ display: 'flex', flexWrap: 'wrap' }} ref={contentToPrint} className={`${imgmodal.barcodeContainer}`}>
                    {
                        barcode?.map((barcode, index) => {
                            return (
                                <div key={index+1}>
                                    <Barcode width={1} height={60} value={barcode?.barcode}/>
                                </div>
                            )
                        })
                    }
                    </div>
                </section>
        </div>
    );
};

export default BarcodeContainer;