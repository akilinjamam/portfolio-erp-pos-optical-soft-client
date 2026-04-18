import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SalesAnalysis.module.scss';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import SalesAnalysisChart from './SalesAnalysisChart';
import useSalesAnalysis from './useSalesAnalysis';
import { addSalesAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';

const SalesAnalysis = () => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState('');
    const { accumulatedSalesInfo, isLoading, saleData, filtered, setCurrentDate } = useSalesAnalysis(month);

    if (isLoading) return <CommonLoading />;

    // Logic remains same
    const salesGroupeByDate = accumulatedSalesInfo;
    const highestSale = salesGroupeByDate?.reduce((max, sale) => (sale.sales > max.sales ? sale : max), { date: "", sales: 0 });
    const lowestSale = salesGroupeByDate?.reduce((min, sale) => (sale.sales < min.sales ? sale : min), { date: "", sales: Infinity });
    const totalSales = salesGroupeByDate?.reduce((acc, item) => acc + Number(item?.sales), 0);
    const totalPaid = saleData?.result?.reduce((acc, item) => acc + Number(item?.advance), 0);
    const totalDiscount = saleData?.result?.reduce((acc, item) => acc + Number(item?.discount), 0);
    const netSales = totalSales - totalDiscount;
    const totalDue = netSales - totalPaid;

    const handlePrint = () => {
        dispatch(openModal('sales-analysis'));
        dispatch(addSalesAnalysis({
            data: filtered,
            salesDetail: { highestSale, lowestSale, totalSales, netSales, totalPaid, totalDiscount, totalDue }
        }));
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Header Section */}
            <header className={styles.header}>
                <div className={styles.titleBlock}>
                    <h1>Sales Analytics</h1>
                    <p>Real-time insights into your revenue performance</p>
                </div>
                <div className={styles.actions}>
                    <button onClick={handlePrint} className={styles.printBtn}>
                        <i className="uil uil-print"></i> Export Report
                    </button>
                </div>
            </header>

            {/* Filter & Metrics Grid */}
            <div className={styles.topGrid}>
                <div className={styles.filterCard}>
                    <h3>Filters</h3>
                    <div className={styles.filterGroup}>
                        <div className={styles.inputBox}>
                            <label>Analysis Month</label>
                            <input type="month" onChange={(e) => setMonth(e.target.value)} />
                        </div>
                        <div className={styles.inputBox}>
                            <label>Time Slot</label>
                            <select onChange={(e) => setCurrentDate(Number(e.target.value))}>
                                <option value={new Date().getDate()}>Default</option>
                                <option value={32}>Full Month</option>
                                <option value={10}>1st Decile</option>
                                <option value={20}>2nd Decile</option>
                                <option value={30}>3rd Decile</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.metricsWrapper}>
                    <div className={`${styles.metricCard} ${styles.total}`}>
                        <span>Total Revenue</span>
                        <h2>${netSales.toLocaleString()}</h2>
                    </div>
                    <div className={`${styles.metricCard} ${styles.paid}`}>
                        <span>Received</span>
                        <h2>${totalPaid.toLocaleString()}</h2>
                    </div>
                    <div className={`${styles.metricCard} ${styles.due}`}>
                        <span>Outstanding</span>
                        <h2>${totalDue.toLocaleString()}</h2>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <section className={styles.chartSection}>
                <SalesAnalysisChart 
                    allSalesPriceData={filtered} 
                    highestSale={highestSale} 
                    lowestSale={lowestSale} 
                    netSales={netSales} 
                    totalDiscount={totalDiscount} 
                    totalDue={totalDue} 
                    totalPaid={totalPaid} 
                />
            </section>
        </div>
    );
};

export default SalesAnalysis;