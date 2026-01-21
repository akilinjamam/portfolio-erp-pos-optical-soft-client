import { Outlet } from 'react-router-dom';
import home from './Home.module.scss';
import useHome from './useHome';
import { homeNavigator } from './homeNavigator';
import DashboardTitleBar from '../dashbord_titlebar/DashboardTitleBar';
import { ToastContainer } from 'react-toastify';
import ImgModal from '../../modal/imgmodal/ImgModal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../modal/imgmodal/imgModalSlice';
import DashboardFooter from '../dashboard_footer/DashboardFooter';
import { useEffect, useState } from 'react';
import decodeJwt from '../../../jwtDecoder/jwtDecoder';
import { io } from 'socket.io-client';
const url = import.meta.env.VITE_SOCKET_URL;
const socket = io(url, {
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
    timeout: 20000
})
const Home = () => {

    const [showUser, setShowUser] = useState([]);
    const token = localStorage.getItem('user');
    const userEmail = localStorage.getItem('userEmail');
   
    const decodeToken = decodeJwt(token);

   const username = decodeToken?.username;

    const exp = decodeToken?.exp;
   
    
    const currentTime = Math.floor(Date.now() / 1000);
    
    const remainingTimeInSeconds = exp - currentTime;

    const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);
    const remainingHourse = Math.floor(remainingMinutes / 60);
    const remainingSeconds = remainingTimeInSeconds % 60;


    const dispath = useDispatch()
    const {slide, setSlide, navigate, location } = useHome()

    const handleSlide = () => {
        setSlide(!slide)
    }

    useEffect(() => {
        if(remainingHourse <= 0 && remainingMinutes <= 0 && remainingSeconds <= 0){
            return navigate('/login')
        }
    },[remainingHourse , remainingMinutes, remainingSeconds, navigate])

    useEffect(() => {
        if(exp === undefined){
            return navigate('/login')
        }
    },[exp, navigate])

    useEffect(() => {
        if(userEmail === null){
            return navigate('/login')
        }
    },[userEmail, navigate])


    useEffect(() => {
        if(username){
            socket.emit('userOnline', username)
        }

        return () => {
            socket.disconnect()
        }
    },[username])
 
    useEffect(() => {
        socket.on('updateOnlineUsers', (onlineUsers) => {
        setShowUser(onlineUsers);
        })

        return () => {
            socket.off('updateOnlineUsers')
        }
    }, [])

    const activeRoute = (routes) => {  
        const links = routes
        const active = links?.some(path => location === path)
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
                    <ToastContainer style={{marginTop:'40px'}}/>
                    <div style={{width: `${slide ? '95%' : '80%'}`, backgroundColor:'white'}} className={`${home.part2}`}>
                        <ImgModal/>
                        <DashboardTitleBar showUser={showUser}/>
                        
                        <Outlet/> 
                        <DashboardFooter/>                  
                    </div>
                    <div className={`${home.part2Res}`}>
                        {/* <ToastContainer style={{marginTop:'40px'}}/> */}
                        <ImgModal/>
                        <DashboardTitleBar showUser={showUser}/>
                        <Outlet/> 
                        <DashboardFooter/>                  
                    </div>
            </div>
        </div>
    );
};

export default Home;