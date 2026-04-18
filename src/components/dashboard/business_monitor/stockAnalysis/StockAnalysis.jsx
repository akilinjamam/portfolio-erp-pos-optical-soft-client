import  { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './StockAnalysis.module.scss';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import StockAnalysisChart from './StockAnalysisChart';
import { addStockAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';
import { calculateTotalPrice } from '../../../calculation/calculateSum';
import useProductOldData from '../../../../data/productData/useProductDataOld';

const StockAnalysis = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState({ from: '', to: '' });
    const [selectedCategory, setSelectedCategory] = useState('Optical Frame');

    const { products, refetch, isLoading } = useProductOldData('', date.from, date.to, '', '');
    const analysisData = products?.result;

    // Derived Data
    const categoryCount = analysisData?.reduce((acc, item) => {
        acc[item?.category] = (acc[item?.category] || 0) + Number(item?.quantity);
        return acc;
    }, {});

    const filteredByCategory = analysisData?.filter(item => item?.category === selectedCategory);

    const totalQty = calculateTotalPrice(filteredByCategory?.map(item => Number(item?.stockAmount)));
    const availableQty = calculateTotalPrice(filteredByCategory?.map(item => Number(item?.quantity)));
    const stockOutQty = totalQty - availableQty;

    useEffect(() => {
        refetch;
    }, [refetch, selectedCategory, date]);

    if (isLoading) return <CommonLoading />;

    const handlePrint = () => {
        dispatch(openModal('stock-analysis'));
        dispatch(addStockAnalysis({ 
            data: analysisData, 
            categoryWishStockDetail: { 
                categoryWiseAvailableQuantity: availableQty, 
                categoryWiseTotalQuantity: totalQty, 
                categoryWiseStockOunt: stockOutQty, 
                categoryName: selectedCategory 
            } 
        }));
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Header Area */}
            <header className={styles.header}>
                <div className={styles.titleBlock}>
                    <h1>Inventory Analytics</h1>
                    <p>Track stock levels and category distributions</p>
                </div>
                <div className={styles.actions}>
                    <button onClick={handlePrint} className={styles.printBtn}>
                        <i className="uil uil-print"></i> Generate Stock Report
                    </button>
                </div>
            </header>

            {/* Filter & Metric Section */}
            <div className={styles.topGrid}>
                <div className={styles.filterCard}>
                    <h3>Inventory Filters</h3>
                    <div className={styles.filterGroup}>
                        <div className={styles.inputBox}>
                            <label>Category</label>
                            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                {Object.keys(categoryCount || {}).map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputBox}>
                            <label>From</label>
                            <input type="date" onChange={(e) => setDate({ ...date, from: e.target.value })} />
                        </div>
                        <div className={styles.inputBox}>
                            <label>To</label>
                            <input type="date" onChange={(e) => setDate({ ...date, to: e.target.value })} />
                        </div>
                    </div>
                </div>

                <div className={styles.metricsWrapper}>
                    <div className={`${styles.metricCard} ${styles.total}`}>
                        <span>Total Stocked</span>
                        <h2>{totalQty.toLocaleString()} <small>units</small></h2>
                    </div>
                    <div className={`${styles.metricCard} ${styles.available}`}>
                        <span>Available Now</span>
                        <h2>{availableQty.toLocaleString()} <small>units</small></h2>
                    </div>
                    <div className={`${styles.metricCard} ${styles.stockout}`}>
                        <span>Items Sold/Out</span>
                        <h2>{stockOutQty.toLocaleString()} <small>units</small></h2>
                    </div>
                </div>
            </div>

            {/* Chart Visualization */}
            <section className={styles.chartSection}>
                <StockAnalysisChart 
                    analysisData={analysisData} 
                    categoryWiseAvailableQuantity={availableQty} 
                    categoryWiseTotalQuantity={totalQty} 
                    categoryWiseStockOunt={stockOutQty} 
                    categoryName={selectedCategory} 
                />
            </section>
        </div>
    );
};

export default StockAnalysis;