import { Outlet } from 'react-router-dom';
import useHome from '../home/useHome';
import report from './ReportModule.module.scss';
import { reportModuleRoute } from './reportModuleRoute';
import ModulePagination from '../module_pagination/ModulePagination';
import { useState } from 'react';

const ReportModule = () => {
    const {navigate, location} = useHome()
    const [paginatedData, setPaginatedData] = useState([]);
    
    return (
        <div  className={`full_width`}>
            <div style={{display: `${location === '/dashboard/report_module' ? 'block' : 'none'}`}}>
                <div  className={`${report.main} flex_top`}>
                    <div className={`${report.container}`}>
                        {
                            paginatedData?.map((cart,index) => {
                                return (
                                    <div onClick={() => navigate(cart.link) } style={{backgroundColor: `${cart.color}`}} className={`${report.allCarts} flex_center`} key={index+1}>
                                    <div>
                                    <i className={cart.icon}></i>
                                    <p>{cart.value}</p>
                                    </div>
                                    </div>
                                )
                            })
                        }
                    </div>   
                </div>
                <ModulePagination data={reportModuleRoute} newDataContainer={setPaginatedData} />
            </div>
            <Outlet/>
        </div>
    );
};

export default ReportModule;