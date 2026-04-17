import  { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ProfitCategoryAnalysis.module.scss';
import useGetProfitExpenseAccountsData from '../../../../data/accountsData/useGetProfitExpenseAccountsData';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import ProfitCategoryAnalysisChart from './ProfitCategoryAnalysisChart';
import { addAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';

const ProfitCategoryAnalysis = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState('');
  const { profitExpenseData, isLoading, refetch } = useGetProfitExpenseAccountsData(month);

  const analysisData = profitExpenseData?.result;

  useEffect(() => {
    refetch();
  }, [refetch, month]);

  if (isLoading) return <CommonLoading />;

  const handlePrint = () => {
    dispatch(openModal('analysis'));
    dispatch(addAnalysis({ data: analysisData }));
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1>Profit Analysis</h1>
          <p>Financial breakdown by payment gateway and category</p>
        </div>
        <div className={styles.actions}>
          <button onClick={handlePrint} className={styles.printBtn}>
            <i className="uil uil-print"></i> Export Financial Report
          </button>
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <div className={styles.scrollableContent}>
        <div className={styles.topGrid}>
          {/* Month Selector Card */}
          <div className={styles.filterCard}>
            <h3>Date Selection</h3>
            <div className={styles.inputBox}>
              <label>Select Analysis Month</label>
              <input 
                type="month" 
                value={month} 
                onChange={(e) => setMonth(e.target.value)} 
              />
            </div>
          </div>

          {/* Channel Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={`${styles.metricCard} ${styles.cash}`}>
              <span>Cash Profit</span>
              <h2>{analysisData?.cashProfit?.toLocaleString() || 0} <small>BDT</small></h2>
            </div>
            <div className={`${styles.metricCard} ${styles.bank}`}>
              <span>Bank + Collection</span>
              <h2>{(analysisData?.bankProfit + (analysisData?.bankDueCollection || 0)).toLocaleString()} <small>BDT</small></h2>
            </div>
            <div className={`${styles.metricCard} ${styles.bkash}`}>
              <span>bKash Profit</span>
              <h2>{(analysisData?.bkashProfit + (analysisData?.bkashDueCollection || 0)).toLocaleString()} <small>BDT</small></h2>
            </div>
            <div className={`${styles.metricCard} ${styles.nagad}`}>
              <span>Nagad Profit</span>
              <h2>{(analysisData?.nogodProfit + (analysisData?.nogodDueCollection || 0)).toLocaleString()} <small>BDT</small></h2>
            </div>
          </div>
        </div>

        {/* Chart Visualization */}
        <section className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <h3>Revenue vs. Gateway Performance</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ProfitCategoryAnalysisChart analysisData={analysisData} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfitCategoryAnalysis;