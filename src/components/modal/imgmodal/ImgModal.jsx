
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
import SingleBarcodeContainer from './SingleBarcodeContainer';
import GlassStockModal from './GlassStockModal';
import TodaySalesModal from './TodaySalesModal';
import TodayDueCollectionModal from './TodayDueCollectionModal';
import PayrollModal from './PayrollModal';
import VendorModal from './VendorModal';
import ExpenseListModal from './ExpenseListModal';
import DailyDueCollectionModal from './DailyDueCollectionModal';
import ProfitExpenseListModal from './ProfitExpenseListModal';
import AnalysisModal from './AnalysisModal';
import ProfitExpenseAnalysisModal from './ProfitExpenseAnalysisModal';
import UpdateCustomerInfo from './UpdateCustomerInfo';
import StockAnalysisModal from './StockAnalysisModal';

const ImgModal = () => {

        const stockData = useSelector(state => state.imgModal.stockData);

        const open = useSelector((state) => state.imgModal.open );
        const img = useSelector((state) => state.imgModal.img );
        const type = useSelector((state) => state.imgModal.type );
        const barcode = useSelector((state) => state.imgModal.barcode );
       
        const employeeData = useSelector((state) => state.imgModal.employeeData)
        const supplierData = useSelector((state) => state.imgModal.supplierData)
        const payrollData = useSelector((state) => state.imgModal.payrollData)
        const vendorData = useSelector((state) => state.imgModal.vendorData)
        const expenseListData = useSelector((state) => state.imgModal.expenseListData)
        const ProfitExpenseListData = useSelector((state) => state.imgModal.profitExpenseData)

        const salesList = useSelector(state => state.imgModal.salesList)
        const salesListForSalesInvoice = useSelector(state => state.imgModal.salesListForSalesInvoice)
  
        const getCustomerInfo = useSelector(state => state.imgModal.customerInfo);
        const getCustomerInfoForSalesInvoice = useSelector(state => state.imgModal.customerInfoForSalesInvoice);
        const singleBarcode = useSelector(state => state.imgModal.singleBarcodes)
        const analysisData = useSelector(state => state.imgModal.profitCalegoryAnalysisData)   
        const stockAnalysisData = useSelector(state => state.imgModal.stockAnalysisData)   
        const categoryWiseStockDetail = useSelector(state => state.imgModal.categoryWishStockDetail)   
        const dispatch = useDispatch();
        
    return (
        <div>
            <ImgContainer open={open} type={type} dispatch={dispatch} closeModal={closeModal} img={img}/>
            <BarcodeContainer open={open} type={type} barcode={barcode} closeModal={closeModal}  dispatch={dispatch} />
            <SingleBarcodeContainer open={open} type={type} barcode={singleBarcode} closeModal={closeModal}  dispatch={dispatch} />
            <CustomerContainer closeModal={closeModal} dispatch={dispatch} open={open} customerInfo={customerInfo} type={type} salesList={salesList}/>
            <UpdateCustomerInfo closeModal={closeModal} dispatch={dispatch} open={open} type={type} getCustomerInfo={getCustomerInfoForSalesInvoice} salesList={salesListForSalesInvoice}/>
            <StockModal closeModal={closeModal} dispatch={dispatch} open={open} stockData={stockData} type={type} />
            <GlassStockModal closeModal={closeModal} dispatch={dispatch} open={open} stockData={stockData} type={type} />
            <SalesModal closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <TodaySalesModal closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <TodayDueCollectionModal closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <DailyDueCollectionModal closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <CustomerListModal closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <InvoiceModal salesList={salesList}  getCustomerInfo={getCustomerInfo}  closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <SalesInvoiceModal salesList={salesListForSalesInvoice}  getCustomerInfo={getCustomerInfoForSalesInvoice}  closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <SalesAdjustModal salesList={salesListForSalesInvoice}  getCustomerInfo={getCustomerInfoForSalesInvoice}  closeModal={closeModal} dispatch={dispatch} open={open} type={type}/>
            <EmployeeModal dispatch={dispatch} closeModal={closeModal}  employeeData={employeeData} open={open} type={type}/>
            <SupplierModal dispatch={dispatch} closeModal={closeModal}  supplierData={supplierData} open={open} type={type}/>
            <PayrollModal dispatch={dispatch} closeModal={closeModal}  payrollData={payrollData} open={open} type={type}/>
            <VendorModal dispatch={dispatch} closeModal={closeModal}  vendorData={vendorData} open={open} type={type}/>
            <ExpenseListModal dispatch={dispatch} closeModal={closeModal}  expenseData={expenseListData} open={open} type={type}/>
            <ProfitExpenseListModal dispatch={dispatch} closeModal={closeModal}  expenseData={ProfitExpenseListData} open={open} type={type}/>
            <AnalysisModal dispatch={dispatch} closeModal={closeModal} open={open} type={type} analysisData={analysisData} />
            <ProfitExpenseAnalysisModal dispatch={dispatch} closeModal={closeModal} open={open} type={type} analysisData={analysisData} />
            <StockAnalysisModal dispatch={dispatch} closeModal={closeModal} open={open} type={type} analysisData={stockAnalysisData} categoryWiseStockDetail={categoryWiseStockDetail}/>

        </div>
    );
};

export default ImgModal;