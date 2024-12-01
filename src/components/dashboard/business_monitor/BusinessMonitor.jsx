import { Outlet } from 'react-router-dom';
import useHome from '../home/useHome';
import businessMonitor from './BusinessMonitor.module.scss';

import { businessMonitorRoute } from './businessMonitorRoute';


const BusinessMonitor = () => {
    const {navigate, location} = useHome()
    return (
        <div  className={`full_width`}>
            <div style={{display: `${location === '/dashboard/business_monitor' ? 'block' : 'none'}`}}>
                <div  className={`${businessMonitor.main} flex_top`}>
                    <div className={`${businessMonitor.container}`}>
                        {
                            businessMonitorRoute.map((cart,index) => {
                                return (
                                    <div onClick={() => navigate(cart.link) } style={{backgroundColor: `${cart.color}`}} className={`${businessMonitor.allCarts} flex_center`} key={index+1}>
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
            </div>
            <Outlet/>
        </div>
    );
};

export default BusinessMonitor;