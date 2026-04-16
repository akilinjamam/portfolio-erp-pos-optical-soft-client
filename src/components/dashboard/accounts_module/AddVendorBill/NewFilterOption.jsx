/* eslint-disable react/prop-types */
import styles from '../../salesModule/todaySales/NewFilterOption.module.scss';

const NewFilterOption = ({pdf, date, setDate, totalCount }) => {
  return (
    <div className={styles.filterContainer}>
        <div className={styles.rightSection}>
            <button className={`${styles.iconBtn} ${styles.printBtn}`} onClick={() => pdf()} title="Print Report">
          <i className="uil uil-print"></i>
        </button>
        <button className={styles.iconBtn} onClick={() => setDate('')} title="Clear Filter">
          <i className="uil uil-refresh"></i>
        </button>
        <div className={styles.inputWrapper}>
          <i className="uil uil-calendar-alt"></i>
          <input 
            type="month" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className={styles.dateInput}
          />
        </div>
        </div>


      <div className={styles.leftSection}>
        <div className={styles.badge}>
          <span className={styles.label}>Total Items:</span>
          <span className={styles.count}>{totalCount}</span>
        </div>
      </div>

      
    </div>
  );
};

export default NewFilterOption;