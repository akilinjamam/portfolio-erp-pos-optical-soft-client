import dashhome from './DashboardHome.module.scss';
import '../../../global_style/global_style.css';
import { routeCarts } from './routeCart';
import useHome from '../home/useHome';

const DashboardHome = () => {
    const { navigate } = useHome();

    return (
        <div className={`${dashhome.main} full_width`}>
            <div className={dashhome.welcomeHeader}>
                <h1>Control Center</h1>
                <p>Select a module to manage your business operations</p>
            </div>

            <div className={dashhome.gridContainer}>
                {routeCarts.map((cart, index) => (
                    <div 
                        key={index}
                        onClick={() => navigate(cart.link)} 
                        className={dashhome.navCard}
                        style={{ '--accent-color': cart.color }}
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
                        {/* Decorative background element */}
                        <div className={dashhome.cardBg}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardHome;