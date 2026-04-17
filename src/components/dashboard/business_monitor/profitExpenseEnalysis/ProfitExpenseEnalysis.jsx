import styles from './ProfitExpenseEnalysis.module.scss';
import useGetProfitExpenseAccountsData from '../../../../data/accountsData/useGetProfitExpenseAccountsData';
import CommonLoading from '../../../commonLoagin/CommonLoading';
import ProfitExpenseAnalysisChart from './ProfitExpenseAnalysisChart';
import { useDispatch } from 'react-redux';
import { addAnalysis, openModal } from '../../../modal/imgmodal/imgModalSlice';
import { useEffect, useState } from 'react';

const ProfitExpenseEnalysis = () => {
  const [month, setMonth] = useState('');
  const { profitExpenseData, isLoading, refetch } = useGetProfitExpenseAccountsData(month);
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [month, refetch]);

  if (isLoading) return <CommonLoading />;

  const result = profitExpenseData?.result;
  const totalExpenses = (result?.totalExpenses || 0) + (result?.fixedExpenses || 0);
  const netProfit = (result?.totalProfit || 0) - totalExpenses;

  const handlePrint = () => {
    dispatch(openModal('profit-expense-analysis'));
    dispatch(addAnalysis({ data: result }));
  };

  return (
    <div className={styles.mainWrapper}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Profit & Expense Analysis</h1>
          <p>Financial overview and performance tracking</p>
        </div>
        <div className={styles.controls}>
          <div className={styles.datePicker}>
            <label>Reporting Month</label>
            <input type="month" onChange={(e) => setMonth(e.target.value)} />
          </div>
          <button className={styles.printBtn} onClick={handlePrint} title="Generate Report">
            <i className="uil uil-print"></i>
            <span>Print Report</span>
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.label}>Gross Profit</span>
          <h2 className={styles.profit}>{result?.totalProfit?.toLocaleString()}</h2>
        </div>
        <div className={styles.statCard}>
          <span className={styles.label}>Total Expenses</span>
          <h2 className={styles.expense}>{totalExpenses.toLocaleString()}</h2>
        </div>
        <div className={`${styles.statCard} ${styles.highlight}`}>
          <span className={styles.label}>Net Profit</span>
          <h2 className={netProfit >= 0 ? styles.positive : styles.negative}>
            {netProfit.toLocaleString()}
          </h2>
        </div>
      </section>

      {/* Chart Section */}
      <section className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h3>Visual Analysis</h3>
        </div>
        <div className={styles.canvasWrapper}>
          <ProfitExpenseAnalysisChart analysisData={result} />
        </div>
      </section>
    </div>
  );
};

export default ProfitExpenseEnalysis;