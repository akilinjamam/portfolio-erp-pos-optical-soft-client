import { useMemo } from 'react';
import dashhome from './DashboardHome.module.scss';
import '../../../global_style/global_style.css';
import useHome from '../home/useHome';
import useCurrentDate from '../../../data/saleData/useCurrentDate';
import useGetLastSalesAndAccountsData from '../../../data/accountsData/useGetLastSalesAccountsData';
import useOneMonthSaleDataPaginated from '../../../data/saleData/useOneMonthSalesDataPaginated';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const formatMoney = (value) => {
    const num = Number(value || 0);
    return num.toLocaleString();
};

const DashboardSalesInsights = () => {
    const { navigate } = useHome();
    const { today, todayMonth } = useCurrentDate();

    const {
        totalCashValue,
        totalBankValue,
        totalBkashValue,
        totalNogodValue,
        isLoading: isLoadingTodaySales,
    } = useGetLastSalesAndAccountsData(today);

    const { saleData: monthSalesData, isLoading: isLoadingMonthSales } = useOneMonthSaleDataPaginated('', '', '', 1, 1, '');
    const monthSummary = monthSalesData?.summary || {};

    const paymentMix = useMemo(() => {
        const data = [totalCashValue, totalBankValue, totalBkashValue, totalNogodValue].map((v) => Number(v || 0));
        return {
            labels: ['Cash', 'Bank', 'Bkash', 'Nogod'],
            datasets: [
                {
                    label: 'Today sales by method',
                    data,
                    backgroundColor: ['#22c55e', '#3b82f6', '#a855f7', '#f97316'],
                    borderColor: 'rgba(255,255,255,0.12)',
                    borderWidth: 1,
                },
            ],
        };
    }, [totalCashValue, totalBankValue, totalBkashValue, totalNogodValue]);

    const monthBar = useMemo(() => {
        const total = Number(monthSummary?.totalSalesValue || 0);
        const paid = Number(monthSummary?.total || 0);
        const discount = Number(monthSummary?.totalDiscount || 0);
        return {
            labels: ['Month Summary'],
            datasets: [
                { label: 'Sales', data: [total], backgroundColor: '#3b82f6' },
                { label: 'Paid', data: [paid], backgroundColor: '#22c55e' },
                { label: 'Discount', data: [discount], backgroundColor: '#f97316' },
            ],
        };
    }, [monthSummary]);

    const isAnyLoading = isLoadingTodaySales || isLoadingMonthSales;

    return (
        <div className={`${dashhome.main} full_width`}>
            <div className={dashhome.headerRow}>
                <div className={dashhome.titleBlock}>
                    <h1>Sales insights</h1>
                    <p>
                        Today: <span className={dashhome.mono}>{today}</span> · Month: <span className={dashhome.mono}>{todayMonth}</span>
                    </p>
                </div>
                <div className={dashhome.quickActions}>
                    <button type="button" className={dashhome.actionBtn} onClick={() => navigate('/dashboard')}>
                        <i className="uil uil-arrow-left"></i>
                        Back to dashboard
                    </button>
                </div>
            </div>

            <section className={dashhome.panelGrid}>
                <div className={`${dashhome.panel} ${dashhome.panelBorderStrong}`}>
                    <div className={dashhome.panelHeader}>
                        <h3>Today payment mix</h3>
                        <span className={dashhome.panelBadge}>Sales methods</span>
                    </div>
                    <div className={`${dashhome.chartBox} ${dashhome.chartBoxCompact}`}>
                        <div className={dashhome.doughnutWrapCompact}>
                            <Doughnut
                                data={paymentMix}
                                options={{
                                    responsive: true,
                                    plugins: { legend: { position: 'bottom' } },
                                    cutout: '62%',
                                }}
                            />
                        </div>
                    </div>
                    <div className={dashhome.smallStats}>
                        <div><span>Cash</span><b>৳ {formatMoney(totalCashValue)}</b></div>
                        <div><span>Bank</span><b>৳ {formatMoney(totalBankValue)}</b></div>
                        <div><span>Bkash</span><b>৳ {formatMoney(totalBkashValue)}</b></div>
                        <div><span>Nogod</span><b>৳ {formatMoney(totalNogodValue)}</b></div>
                    </div>
                </div>

                <div className={`${dashhome.panel} ${dashhome.panelBorderStrong}`}>
                    <div className={dashhome.panelHeader}>
                        <h3>Month highlights</h3>
                        <span className={dashhome.panelBadge}>Sales vs paid</span>
                    </div>
                    <div className={dashhome.chartBox}>
                        <Bar
                            data={monthBar}
                            options={{
                                responsive: true,
                                plugins: { legend: { position: 'bottom' }, title: { display: false } },
                                scales: {
                                    x: { grid: { display: false } },
                                    y: { grid: { color: 'rgba(148,163,184,0.25)' } },
                                },
                            }}
                        />
                    </div>
                    <div className={dashhome.insights}>
                        <div className={dashhome.insight}>
                            <span>Paid</span>
                            <b>৳ {formatMoney(monthSummary?.total)}</b>
                        </div>
                        <div className={dashhome.insight}>
                            <span>Cash</span>
                            <b>৳ {formatMoney(monthSummary?.totalCash)}</b>
                        </div>
                        <div className={dashhome.insight}>
                            <span>Bank</span>
                            <b>৳ {formatMoney(monthSummary?.totalBank)}</b>
                        </div>
                        <div className={dashhome.insight}>
                            <span>Bkash/Nogod</span>
                            <b>৳ {formatMoney(Number(monthSummary?.totalBkash || 0) + Number(monthSummary?.totalNogod || 0))}</b>
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

export default DashboardSalesInsights;

