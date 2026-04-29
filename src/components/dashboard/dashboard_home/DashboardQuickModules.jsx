import dashhome from './DashboardHome.module.scss';
import '../../../global_style/global_style.css';
import { routeCarts } from './routeCart';
import useHome from '../home/useHome';

const DashboardQuickModules = () => {
    const { navigate } = useHome();

    return (
        <div className={`${dashhome.main} full_width`}>
            <div className={dashhome.headerRow}>
                <div className={dashhome.titleBlock}>
                    <h1>Quick modules</h1>
                    <p>Jump to any module to manage operations.</p>
                </div>
                <div className={dashhome.quickActions}>
                    <button type="button" className={dashhome.actionBtn} onClick={() => navigate('/dashboard')}>
                        <i className="uil uil-arrow-left"></i>
                        Back to dashboard
                    </button>
                </div>
            </div>

            <div className={dashhome.gridContainer}>
                {routeCarts.map((cart, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(cart.link)}
                        className={dashhome.navCard}
                        style={{ '--accent-color': cart.color }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                navigate(cart.link);
                            }
                        }}
                    >
                        <div className={dashhome.iconWrapper}>
                            <i className={cart.icon}></i>
                        </div>
                        <div className={dashhome.cardContent}>
                            <h3>{cart.value}</h3>
                            <div className={dashhome.actionLabel}>
                                Explore Module <i className="uil uil-arrow-right"></i>
                            </div>
                        </div>
                        <div className={dashhome.cardBg}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardQuickModules;

