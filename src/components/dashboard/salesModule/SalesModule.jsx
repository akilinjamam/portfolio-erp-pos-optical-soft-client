import useHome from '../home/useHome';
import sales from './SalesModule.module.scss'
import { salesCartRoute } from './salesCart';
const SalesModule = () => {
    const {navigate} = useHome()
    return (
        <div className={`${sales.main} flex_top full_width`}>
            <div className={`${sales.container}`}>
                {
                    salesCartRoute.map((cart,index) => {
                        return (
                            <div onClick={() => navigate(cart.link) } style={{backgroundColor: `${cart.color}`}} className={`${sales.allCarts} flex_center`} key={index+1}>
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

export default SalesModule;