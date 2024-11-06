
import { useDispatch, useSelector } from 'react-redux';
import '../../../global_style/global_style.css';
import { closeModal, customerInfo } from './imgModalSlice';

import ImgContainer from './ImgContainer';
import BarcodeContainer from './BarcodeContainer';
import CustomerContainer from './CustomerContainer';
import StockModal from './StockModal';
import SalesModal from './SalesModal';
import CustomerListModal from './CustimerListModal';
import InvoiceModal from './InvoiceModal';
import EmployeeModal from './EmployeeModal';
import SalesInvoiceModal from './SalesInvoiceModal';
import SalesAdjustModal from './SalesAdjustModal';
import SupplierModal from './SupplierModal';

const ImgModal = () => {

        const stockData = useSelector(state => state.imgModal.stockData);

        const open = useSelector((state) => state.imgModal.open );
        const img = useSelector((state) => state.imgModal.img );
        const type = useSelector((state) => state.imgModal.type );
        const barcode = useSelector((state) => state.imgModal.barcode );
        const employeeData = useSelector((state) => state.imgModal.employeeData)
        const supplierData = useSelector((state) => state.imgModal.supplierData)

        const salesList = useSelector(state => state.imgModal.salesList)
        const salesListForSalesInvoice = useSelector(state => state.imgModal.salesListForSalesInvoice)
  
        const getCustomerInfo = useSelector(state => state.imgModal.customerInfo);
        const getCustomerInfoForSalesInvoice = useSelector(state => state.imgModal.customerInfoForSalesInvoice);
        const dispatch = useDispatch();
        
    return (
        <div>
            <ImgContainer open={open} type={type} dispatch={dispatch} closeModal={closeModal} img={img}/>
            <BarcodeContainer open={open} type={type} barcode={barcode} closeModal={closeModal}  dispatch={dispatch} />
            <CustomerContainer closeModal={closeModal} dispatch={dispatch} open={open} customerInfo={customerInfo} type={type} salesList={salesList}/>
            <StockModal closeModal={closeModal} dispatch={dispatch} open={open} stockData={stockData} type={type} />
            <SalesModal closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <CustomerListModal closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <InvoiceModal salesList={salesList}  getCustomerInfo={getCustomerInfo}  closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <SalesInvoiceModal salesList={salesListForSalesInvoice}  getCustomerInfo={getCustomerInfoForSalesInvoice}  closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <SalesAdjustModal salesList={salesListForSalesInvoice}  getCustomerInfo={getCustomerInfoForSalesInvoice}  closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <EmployeeModal dispatch={dispatch} closeModal={closeModal}  employeeData={employeeData} open={open} type={type}/>
            <SupplierModal dispatch={dispatch} closeModal={closeModal}  supplierData={supplierData} open={open} type={type}/>
            
        </div>
    );
};

export default ImgModal;