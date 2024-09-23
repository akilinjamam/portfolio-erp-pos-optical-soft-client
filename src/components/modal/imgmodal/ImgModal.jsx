
import { useDispatch, useSelector } from 'react-redux';
import '../../../global_style/global_style.css';
import { closeModal, customerInfo } from './imgModalSlice';

import ImgContainer from './ImgContainer';
import BarcodeContainer from './BarcodeContainer';
import CustomerContainer from './CustomerContainer';
import StockModal from './StockModal';

const ImgModal = () => {

        const stockData = useSelector(state => state.imgModal.stockData);
        console.log(stockData)
        const open = useSelector((state) => state.imgModal.open );
        const img = useSelector((state) => state.imgModal.img );
        const type = useSelector((state) => state.imgModal.type );
        const barcode = useSelector((state) => state.imgModal.barcode );
        const dispatch = useDispatch();
        
    return (
        <div>
        
            <ImgContainer open={open} type={type} dispatch={dispatch} closeModal={closeModal} img={img}/>
            <BarcodeContainer open={open} type={type} barcode={barcode} closeModal={closeModal}  dispatch={dispatch} />
            <CustomerContainer closeModal={closeModal} dispatch={dispatch} open={open} customerInfo={customerInfo} type={type}/>
            <StockModal closeModal={closeModal} dispatch={dispatch} open={open} stockData={stockData} type={type} />
        </div>
    );
};

export default ImgModal;