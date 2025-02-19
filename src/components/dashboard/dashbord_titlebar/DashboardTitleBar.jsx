/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import useHome from '../home/useHome';
import dashboardTitle from './DashboardTitleBar.module.scss';
import decodeJwt from '../../../jwtDecoder/jwtDecoder';
import { useMemo } from 'react';
import { useEffect } from 'react';
const DashboardTitleBar = () => {

    const getToken = localStorage.getItem('user');

    const splitToken = getToken?.split(' ')[1];
    const getUser = decodeJwt(splitToken);


    const [view, setView] = useState(false);
    const [date, setDate] = useState(new Date());
    const {location, navigate} = useHome();
    
    const mappingRoutes = location.split('/').slice(1)

    const handleRoute = (index) => {
        const findNavigation = mappingRoutes?.slice(0, index).join('/');
        navigate(`/${findNavigation}`)
     }
     const formattedDate = useMemo(() => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        return {
            day: daysOfWeek[date.getDay()],
            monthDate: date.getDate(),
            monthName: monthNames[date.getMonth()],
            year: date.getFullYear(),
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('user');
        navigate('/login')
    }


    return (
        <div className={`${dashboardTitle.main}`}>
           <div className={`${dashboardTitle.titleBar} flex_center `}>
                <div className={`${dashboardTitle.titleBarContainer} flex_between`}>
                     <div className={`${dashboardTitle.mappedRoute}`}>
                     {
                        mappingRoutes?.map((route, index) => <span onClick={() => handleRoute(index+1)} key={index}><i className="uil uil-angle-right"></i>  {route.toUpperCase().replace(/_/g, ' ')} </span> )
                     }
                     </div>
                   
                    <div onClick={() => setView(!view)} className={`${dashboardTitle.mappedRoute}`}>
                        <div style={{width:'365px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <p>{formattedDate.day}, {formattedDate.monthDate} {formattedDate.monthName} {formattedDate.year},{" "}
                        {date.getHours() % 12 || 12}:{String(date.getMinutes()).padStart(2, "0")}:
                        {String(date.getSeconds()).padStart(2, "0")} {date.getHours() >= 12 ? 'PM' : 'AM'}</p>
                        <p><i style={{fontSize:"30px"}} className="uil uil-user-circle"></i></p>
                        </div>
                        <div style={{display: `${view ? 'block': 'none'}`}} className={`${dashboardTitle.userDetails}`}>
                            <h4>{getUser?.username?.length >= 16 ? getUser?.username?.slice(0,16) + '...' : getUser?.username}</h4>
                            <hr />
                            <br />
                            <p onClick={handleLogOut}><i className="uil uil-sign-out-alt"></i> Logout</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default DashboardTitleBar;