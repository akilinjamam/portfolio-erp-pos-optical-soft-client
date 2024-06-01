import dashhome from './DashboardHome.module.scss';
import '../../../global_style/global_style.css'
import { routeCarts } from './routeCart';
import useHome from '../home/useHome';
const DashboardHome = () => {
    const {navigate} = useHome()
    return (
        <div className={`${dashhome.main} flex_top full_width`}>
            <div className={`${dashhome.container}`}>
                {
                    routeCarts.map((cart,index) => {
                        return (
                            <div onClick={() => navigate(cart.link) } style={{backgroundColor: `${cart.color}`}} className={`${dashhome.allCarts} flex_center`} key={index+1}>
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
    );
};

export default DashboardHome;