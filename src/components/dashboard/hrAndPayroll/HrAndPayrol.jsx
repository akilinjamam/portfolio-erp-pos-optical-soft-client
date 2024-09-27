import { Outlet } from 'react-router-dom';
import useHome from '../home/useHome';
import payrol from './HrAndPayroll.module.scss';
import { hrAndPayrollRoute } from './hrAndPayrollRoute';

const HrAndPayroll = () => {
    const {navigate, location} = useHome()
    return (
        <div  className={`full_width`}>
            <div style={{display: `${location === '/dashboard/hr_and_payroll_module' ? 'block' : 'none'}`}}>
                <div  className={`${payrol.main} flex_top`}>
                    <div className={`${payrol.container}`}>
                        {
                            hrAndPayrollRoute.map((cart,index) => {
                                return (
                                    <div onClick={() => navigate(cart.link) } style={{backgroundColor: `${cart.color}`}} className={`${payrol.allCarts} flex_center`} key={index+1}>
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

export default HrAndPayroll;