import { useMemo } from 'react';
import dashhome from './DashboardHome.module.scss';
import '../../../global_style/global_style.css';
import useHome from '../home/useHome';
import useCurrentDate from '../../../data/saleData/useCurrentDate';
import useGetLastSalesAndAccountsData from '../../../data/accountsData/useGetLastSalesAccountsData';
import useOneMonthSaleDataPaginated from '../../../data/saleData/useOneMonthSalesDataPaginated';
import useGetProfitExpenseAccountsData from '../../../data/accountsData/useGetProfitExpenseAccountsData';
import useProductData from '../../../data/productData/useProductData';
import useGetSupplierDataPaginated from '../../../data/supplierData/useGetSupplierDataPaginated';
import useGetEmployeeData from '../../../data/employeeData/useGetEmployeeData';
import useGetAllVendorData from '../../../data/vendorData/useGetVendorData';
import { calculateTotalPrice } from '../../calculation/calculateSum';

const formatMoney = (value) => {
    const num = Number(value || 0);
    return num.toLocaleString();
};

const DashboardHome = () => {
    const { navigate } = useHome();
    const { today, todayMonth, onlyYear, onlyMonth } = useCurrentDate();

    // --- Sales (today) ---
    const {
        lastSaleAndAccountsData,
        totalSalesValue: totalTodaySalesValue,
        isLoading: isLoadingTodaySales,
    } = useGetLastSalesAndAccountsData(today);

    const todayAdvancePaid = useMemo(() => {
        const advance = lastSaleAndAccountsData?.result?.allSalesDetail?.map((sale) => Number(sale?.advance || 0));
        return calculateTotalPrice(advance);
    }, [lastSaleAndAccountsData]);

    const todayDiscount = useMemo(() => {
        const discount = lastSaleAndAccountsData?.result?.allSalesDetail?.map((sale) => Number(sale?.discount || 0));
        return calculateTotalPrice(discount);
    }, [lastSaleAndAccountsData]);

    const todayDue = Math.max(0, Number(totalTodaySalesValue || 0) - Number(todayAdvancePaid || 0) - Number(todayDiscount || 0));

    // --- Sales (last month / default range) ---
    const { saleData: monthSalesData, isLoading: isLoadingMonthSales } = useOneMonthSaleDataPaginated('', '', '', 1, 1, '');
    const monthSummary = monthSalesData?.summary || {};

    // --- Accounting (profit/expense for current month) ---
    const { profitExpenseData, isLoading: isLoadingProfitExpense } = useGetProfitExpenseAccountsData(todayMonth);
    const monthProfitExpense = profitExpenseData?.result;
    const monthTotalExpenses = Number(monthProfitExpense?.totalExpenses || 0) + Number(monthProfitExpense?.fixedExpenses || 0);
    const monthNetProfit = Number(monthProfitExpense?.totalProfit || 0) - monthTotalExpenses;

    // --- Counts ---
    const { products: productsAll, isLoading: isLoadingProductsAll } = useProductData('', '', '', '', '', 1, 1, '');
    const { products: productsInStock, isLoading: isLoadingProductsInStock } = useProductData('', '', '', '', '', 1, 1, true);
    const { supplierData, isLoading: isLoadingSuppliers } = useGetSupplierDataPaginated('', 1, 1);
    const { employeeData, isLoading: isLoadingEmployees } = useGetEmployeeData('', '', '', 1, 1);
    const { payroll: vendorsRes, isLoading: isLoadingVendors } = useGetAllVendorData('', onlyYear, onlyMonth);

    const vendorBills = useMemo(() => vendorsRes?.data?.result || [], [vendorsRes]);
    const vendorPaidThisMonth = useMemo(() => calculateTotalPrice(vendorBills?.map((b) => Number(b?.paid || 0))), [vendorBills]);

    const isAnyLoading =
        isLoadingTodaySales ||
        isLoadingMonthSales ||
        isLoadingProfitExpense ||
        isLoadingProductsAll ||
        isLoadingProductsInStock ||
        isLoadingSuppliers ||
        isLoadingEmployees ||
        isLoadingVendors;

    return (
        <div className={`${dashhome.main} full_width`}>
            <div className={dashhome.headerRow}>
                <div className={dashhome.titleBlock}>
                    <h1>Business Summary</h1>
                    <p>Today: <span className={dashhome.mono}>{today}</span> · Month: <span className={dashhome.mono}>{todayMonth}</span></p>
                </div>

                <div className={dashhome.quickActions}>
                    <button type="button" className={dashhome.actionBtn} onClick={() => navigate('/dashboard/quick_modules')}>
                        <i className="uil uil-apps"></i>
                        Quick modules
                    </button>
                    <button type="button" className={dashhome.actionBtn} onClick={() => navigate('/dashboard/sales_insights')}>
                        <i className="uil uil-chart-pie"></i>
                        Sales insights
                    </button>
                </div>
            </div>

            <section className={dashhome.kpiGrid}>
                <div className={`${dashhome.kpiCard} ${dashhome.kpiCardSales}`}>
                    <div className={dashhome.kpiTop}>
                        <span className={dashhome.kpiLabel}>Today Sales</span>
                        <i className={`uil uil-shopping-cart ${dashhome.kpiIcon}`}></i>
                    </div>
                    <div className={dashhome.kpiValue}>৳ {formatMoney(totalTodaySalesValue)}</div>
                    <div className={dashhome.kpiMeta}>
                        <span>Paid: <b>৳ {formatMoney(todayAdvancePaid)}</b></span>
                        <span>Due: <b>৳ {formatMoney(todayDue)}</b></span>
                    </div>
                </div>

                <div className={`${dashhome.kpiCard} ${dashhome.kpiCardMonth}`}>
                    <div className={dashhome.kpiTop}>
                        <span className={dashhome.kpiLabel}>Month Sales (summary)</span>
                        <i className={`uil uil-chart ${dashhome.kpiIcon}`}></i>
                    </div>
                    <div className={dashhome.kpiValue}>৳ {formatMoney(monthSummary?.totalSalesValue)}</div>
                    <div className={dashhome.kpiMeta}>
                        <span>Sold Qty: <b>{formatMoney(monthSummary?.totalSoldQuantity)}</b></span>
                        <span>Discount: <b>৳ {formatMoney(monthSummary?.totalDiscount)}</b></span>
                    </div>
                </div>

                <div className={`${dashhome.kpiCard} ${dashhome.kpiCardProfit}`}>
                    <div className={dashhome.kpiTop}>
                        <span className={dashhome.kpiLabel}>Net Profit (month)</span>
                        <i className={`uil uil-moneybag ${dashhome.kpiIcon}`}></i>
                    </div>
                    <div className={`${dashhome.kpiValue} ${monthNetProfit >= 0 ? dashhome.positive : dashhome.negative}`}>
                        ৳ {formatMoney(monthNetProfit)}
                    </div>
                    <div className={dashhome.kpiMeta}>
                        <span>Gross: <b>৳ {formatMoney(monthProfitExpense?.totalProfit)}</b></span>
                        <span>Expenses: <b>৳ {formatMoney(monthTotalExpenses)}</b></span>
                    </div>
                </div>

                <div className={`${dashhome.kpiCard} ${dashhome.kpiCardOps}`}>
                    <div className={dashhome.kpiTop}>
                        <span className={dashhome.kpiLabel}>Operations</span>
                        <i className={`uil uil-layers ${dashhome.kpiIcon}`}></i>
                    </div>
                    <div className={dashhome.splitStats}>
                        <div className={dashhome.splitItem}>
                            <span className={dashhome.splitLabel}>Products</span>
                            <b>{productsAll?.totalStock ?? '--'}</b>
                            <span className={dashhome.splitHint}>In stock: {productsInStock?.totalStock ?? '--'}</span>
                        </div>
                        <div className={dashhome.splitItem}>
                            <span className={dashhome.splitLabel}>Suppliers</span>
                            <b>{supplierData?.total ?? '--'}</b>
                            <span className={dashhome.splitHint}>Employees: {employeeData?.total ?? '--'}</span>
                        </div>
                        <div className={dashhome.splitItem}>
                            <span className={dashhome.splitLabel}>Vendor bills (month)</span>
                            <b>{vendorBills?.length ?? 0}</b>
                            <span className={dashhome.splitHint}>Paid: ৳ {formatMoney(vendorPaidThisMonth)}</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className={dashhome.footerNote}>
                {isAnyLoading ? 'Updating analytics…' : 'All analytics are up to date.'}
            </div>
        </div>
    );
};

export default DashboardHome;