import { Outlet } from 'react-router-dom';
import useHome from '../home/useHome';
import report from './ReportModule.module.scss';
import { reportModuleRoute } from './reportModuleRoute';
import ModulePagination from '../module_pagination/ModulePagination';
import { useState } from 'react';

const ReportModule = () => {
    const { navigate, location } = useHome();
    const [paginatedData, setPaginatedData] = useState([]);
    
    const isRoot = location === '/dashboard/report_module';

    return (
        <div className={report.wrapper}>
            {isRoot && (
                <div className={report.viewContainer}>
                    <header className={report.header}>
                        <div className={report.titleGroup}>
                            <h1>Analytics & Reports</h1>
                            <p>Generate and analyze business data from various departments</p>
                        </div>
                    </header>

                    <div className={report.grid}>
                        {paginatedData?.map((cart, index) => (
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

                    <div className={report.paginationSpacer}>
                        <ModulePagination 
                            data={reportModuleRoute} 
                            newDataContainer={setPaginatedData} 
                        />
                    </div>
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default ReportModule;