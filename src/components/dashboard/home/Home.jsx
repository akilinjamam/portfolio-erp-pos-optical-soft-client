import { Outlet } from 'react-router-dom';
import home from './Home.module.scss';
import useHome from './useHome';
import { homeNavigator } from './homeNavigator';
import DashboardTitleBar from '../dashbord_titlebar/DashboardTitleBar';
import { ToastContainer } from 'react-toastify';
import ImgModal from '../../modal/imgmodal/ImgModal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../modal/imgmodal/imgModalSlice';
const Home = () => {
    
    const dispath = useDispatch()
 
    const {slide, setSlide, error,navigate, location } = useHome()

    const handleSlide = () => {
        setSlide(!slide)
    }
    

    if(error){
        return navigate('/login')
    }

    const activeRoute = (routes) => {  
        const links = [routes?.one, routes?.two, routes?.three, routes?.four, routes?.five];
        const active = links.some(path => location === path)
         return active ? `${home.iActive}` : `${home.ifontColor}`
    }

    


    return (
        <div className={`${home.main}`}>
            <div className={`${home.iconBar}`}>
                {
                    homeNavigator?.map((icon, index) => <div className={`${home.navigation_icon} flex_center`} key={index+1}><i onClick={() => navigate(icon.route)} title={slide ? icon.value : ''} className={`${icon.icon} ${activeRoute(icon.routes)}`}></i></div> )
                }
            </div>
            <div className={`${home.container} only_flex`}>
                    <div style={{transform: `translate(${slide ? '-75%' : '0%'})`}} className={`${home.part1}`}>
                            {
                                homeNavigator?.map((values, index) => 
                                <div className={`${home.navigation_title} flex_left`} key={index + 1}>
                                    <p className={`${activeRoute(values.routes)}`} onClick={() => {
                                        navigate(values.route)
                                        dispath(closeModal())
                                    }}>
                                    {values.value}
                                    </p>
                                </div> )
                            }
                            <div className={`${home.slideBtn} flex_center`} onClick={handleSlide}> 
                                <i className={`uil uil-angle-${slide ? 'right' : 'left'}`}></i>
                            </div>
                    </div>
                    <div style={{width: `${slide ? '95%' : '80%'}`}} className={`${home.part2}`}>
                        <ToastContainer style={{marginTop:'40px'}}/>
                        <ImgModal/>
                        <DashboardTitleBar/>
                        <Outlet/>                    
                    </div>
                </div>
        </div>
    );
};

export default Home;