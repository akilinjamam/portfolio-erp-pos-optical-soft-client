import { Outlet } from 'react-router-dom';
import home from './Home.module.scss';
import useHome from './useHome';
import { homeNavigator } from './homeNavigator';

const Home = () => {
 
    const {slide, setSlide, error,navigate } = useHome()

    const handleSlide = () => {
        setSlide(!slide)
    }
    
    if(error){
        return navigate('/login')
    }

    return (
        <div className={`${home.main}`}>
            <div className={`${home.iconBar}`}>
                {
                    homeNavigator?.map((icon, index) => <div className={`${home.navigation_icon} flex_center`} key={index+1}><i title={slide ? icon.value : ''} className={icon.icon}></i></div> )
                }
            </div>
            <div className={`${home.container} only_flex`}>
                    <div style={{transform: `translate(${slide ? '-75%' : '0%'})`}} className={`${home.part1}`}>
                            {
                                homeNavigator?.map((values, index) => 
                                <div className={`${home.navigation_title} flex_left`} key={index + 1}>
                                    <p>{values.value}</p>
                                </div> )
                            }
                        <div className={`${home.slideBtn} flex_center`} onClick={handleSlide}>
                            
                            <i className={`uil uil-angle-${slide ? 'right' : 'left'}`}></i>
                        </div>
                    </div>
                    <div style={{width: `${slide ? '95%' : '80%'}`}} className={`${home.part2}`}>
                        <Outlet/>
                    </div>
                </div>
        </div>
    );
};

export default Home;