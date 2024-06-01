import { Outlet } from 'react-router-dom';
import useHome from '../home/useHome';
import admin from './Administration.module.scss';
import { administrationRoute } from './administrationRoute';

const Administration = () => {
    const {navigate, location} = useHome()
    return (
        <div  className={`full_width`}>
            <div style={{display: `${location === '/dashboard/administration_module' ? 'block' : 'none'}`}}>
                <div  className={`${admin.main} flex_top`}>
                    <div className={`${admin.container}`}>
                        {
                            administrationRoute.map((cart,index) => {
                                return (
                                    <div onClick={() => navigate(cart.link) } style={{backgroundColor: `${cart.color}`}} className={`${admin.allCarts} flex_center`} key={index+1}>
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

export default Administration;