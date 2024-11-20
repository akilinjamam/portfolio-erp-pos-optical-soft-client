import { Outlet } from 'react-router-dom';
import useHome from '../home/useHome';
import accounts from './AccountsModule.module.scss';
import { accountsModuleRoute } from './accountsModuleRoute';


const AccountsModule = () => {
    const {navigate, location} = useHome()
    return (
        <div  className={`full_width`}>
            <div style={{display: `${location === '/dashboard/accounts_module' ? 'block' : 'none'}`}}>
                <div  className={`${accounts.main} flex_top`}>
                    <div className={`${accounts.container}`}>
                        {
                            accountsModuleRoute.map((cart,index) => {
                                return (
                                    <div onClick={() => navigate(cart.link) } style={{backgroundColor: `${cart.color}`}} className={`${accounts.allCarts} flex_center`} key={index+1}>
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

export default AccountsModule;