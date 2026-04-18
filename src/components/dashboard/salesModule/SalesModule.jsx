import { Outlet } from 'react-router-dom';
import useHome from '../home/useHome';
import report from '../report_module/ReportModule.module.scss';
import { salesCartRoute } from './salesCart';


const SalesModule = () => {
    const { navigate, location } = useHome();
   
    
    const isRoot = location === '/dashboard/sales_module';

    return (
        <div className={report.wrapper}>
            {isRoot && (
                <div className={report.viewContainer}>
                    <header className={report.header}>
                        <div className={report.titleGroup}>
                            <h1>Sales Module</h1>
                            <p>Generate Sales Related various information</p>
                        </div>
                    </header>

                    <div className={report.grid}>
                        {salesCartRoute?.map((cart, index) => (
                            <div 
                                key={index}
                                onClick={() => navigate(cart.link)} 
                                className={report.reportCard}
                                style={{ '--accent': cart.color }}
                            >
                                <div className={report.cardInner}>
                                    <div className={report.iconCircle}>
                                        <i className={cart.icon}></i>
                                    </div>
                                    <div className={report.info}>
                                        <h3>{cart.value}</h3>
                                        <span>View Details <i className="uil uil-arrow-right"></i></span>
                                    </div>
                                </div>
                                <div className={report.glow}></div>
                            </div>
                        ))}
                    </div>

                  
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default SalesModule;