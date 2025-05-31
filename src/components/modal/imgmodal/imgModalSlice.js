import { createSlice } from "@reduxjs/toolkit"

export const imgModalSlice = createSlice({
    name: "imgModal",
    initialState: {
        open: false,
        lock: false,
        type: '',
        img: '',
        barcode: [],
        singleBarcodes: {},
        customerInfo: {},
        customerInfoForSalesInvoice: {},
        stockData: [],
        salesData: [],
        salesList: [],
        salesListForSalesInvoice: [],
        totalSalesValue: 0,
        totalSalesItem: 0,
        totalCash: 0,
        totalBank: 0,
        totalBkash: 0,
        totalNogod: 0,
        totalCashPaid: 0,
        totalBankPaid: 0,
        totalBkashPaid: 0,
        totalNogodPaid: 0,
        employeeData: [],
        supplierData: [],
        payrollData: [],
        vendorData: [],
        expenseListData: [],
        profitExpenseData: [],
        options: {},
        profitCalegoryAnalysisData: {},
        stockAnalysisData: [],
        salesAnalysisData: [],
        salesDetail: {},
        categoryWishStockDetail: {},
        resetForm: false,
        monthYear: '',
        cashFlow: [],
        totalProfitAllocation: 0,
        soldQuantity: 0,
        totalTodayPaid: 0,
        totalDueCollection: 0,
        totalCashDueCollection: 0,
        totalBankDueCollection: 0,
        totalBkashDueCollection: 0,
        totalNogodDueCollection: 0,
        vendorBillData: [],
        stockTotalInfo: {},
        keyGuard: false,
        glassType: ''

    },
    reducers: {
        openModal: (state, action) => {
            state.open = true;
            state.lock = true
            state.type = action.payload;
        },
        closeModal: (state) => {
            state.open = false
            state.lock = false
        },
        openImg: (state, action) => {
            state.img = action.payload
        },
        openBarcode: (state, action) => {
            state.barcode = action.payload
        },
        openSingleBarcode: (state, action) => {
            state.singleBarcodes = action.payload;

        },
        customerInfo: (state, action) => {
            state.customerInfo = action.payload
        },
        clearCustomerInfo: (state) => {
            state.customerInfo = {};
            state.resetForm = true
        },
        resetFormState: (state) => {
            state.resetForm = false
        },
        customerInfoForSalesInvoice: (state, action) => {
            state.customerInfoForSalesInvoice = action.payload
        },
        addStockData: (state, action) => {
            state.stockData = action.payload;
        },
        addStockTotalInfo: (state, action) => {
            state.stockTotalInfo = action.payload;
        },
        addSalesData: (state, action) => {
            state.salesData = action.payload.modifiedData;
            state.totalSalesValue = action.payload.totalSalesValue;
            state.totalSalesItem = action.payload.totalSalesItem;
            state.totalPaid = action.payload.totalPaid;
            state.totalTodayPaid = action.payload.totalTodayPaid;
            state.totalDiscount = action.payload.totalDiscount;
            state.totalCash = action.payload.totalCash;
            state.totalBank = action.payload.totalBank;
            state.totalBkash = action.payload.totalBkash;
            state.totalNogod = action.payload.totalNogod;
            state.totalCashPaid = action.payload.totalCashPaidValue;
            state.totalBankPaid = action.payload.totalBankPaidValue;
            state.totalBkashPaid = action.payload.totalBkashPaidValue;
            state.totalNogodPaid = action.payload.totalNogodPaidValue;
            state.totalSalesQuantity = action.payload.totalSalesQuantity;
            state.totalDueCollection = action.payload.totalDueCollection;
            state.totalCashDueCollection = action.payload.totalCashDueCollection;
            state.totalBankDueCollection = action.payload.totalBankDueCollection;
            state.totalBkashDueCollection = action.payload.totalBkashDueCollection;
            state.totalNogodDueCollection = action.payload.totalNogodDueCollection;
        },
        addBestPerformerData: (state, action) => {
            state.salesData = action.payload.modifiedData;
            state.totalSalesValue = action.payload.totalSalesValue;
        },
        customerList: (state, action) => {
            state.salesData = action.payload;
        },
        addSalesList: (state, action) => {
            state.salesList = action.payload
        },
        addSalesListForSalesInvoice: (state, action) => {
            state.salesListForSalesInvoice = action.payload
        },
        addEmployeeList: (state, action) => {
            state.employeeData = action.payload
        },
        addSupplierList: (state, action) => {
            state.supplierData = action.payload
        },
        addPayrollList: (state, action) => {
            state.payrollData = action.payload
        },
        addVendorList: (state, action) => {
            state.vendorData = action.payload
        },
        addExpenseListData: (state, action) => {
            state.expenseListData = action.payload
        },
        addProfitExpenseData: (state, action) => {
            state.profitExpenseData = action.payload
        },
        addAnalysis: (state, action) => {
            state.profitCalegoryAnalysisData = action.payload.data
        },
        addStockAnalysis: (state, action) => {
            state.stockAnalysisData = action.payload.data
            state.categoryWishStockDetail = action.payload.categoryWishStockDetail
        },
        addSalesAnalysis: (state, action) => {
            state.salesAnalysisData = action.payload.data
            state.salesDetail = action.payload.salesDetail
        },
        addMonthYear: (state, action) => {
            state.monthYear = action.payload;
        },
        addCashFlowData: (state, action) => {
            state.cashFlow = action.payload.cashFlow;
            state.totalProfitAllocation = action.payload.profitAllocation;
        },
        addVendorBillData: (state, action) => {
            state.vendorBillData = action.payload.vendorBillData;
        },
        addKeyGuard: (state) => {
            state.keyGuard = true
        },
        removeKeyGuard: (state) => {
            state.keyGuard = false
        },
        addNewGlassType: (state, action) => {
            state.glassType = action.payload
        },
        removeNewGlassType: (state) => {
            state.glassType = ''
        }

    }
})

export const { openModal, closeModal, openImg, openBarcode, customerInfo, addStockData, addSalesData, customerList, addSalesList, addEmployeeList, customerInfoForSalesInvoice, addSalesListForSalesInvoice, addSupplierList, openSingleBarcode, addPayrollList, addVendorList, addExpenseListData, addProfitExpenseData, addAnalysis, addStockAnalysis, addSalesAnalysis, addBestPerformerData, clearCustomerInfo, resetFormState, addMonthYear, addCashFlowData, addVendorBillData, addStockTotalInfo, addKeyGuard, removeKeyGuard, addNewGlassType, removeNewGlassType } = imgModalSlice.actions


export default imgModalSlice.reducer