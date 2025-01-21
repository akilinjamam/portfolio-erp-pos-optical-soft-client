import { useState } from 'react';
import useHome from '../home/useHome';
import dashboardTitle from './DashboardTitleBar.module.scss';
import decodeJwt from '../../../jwtDecoder/jwtDecoder';
const DashboardTitleBar = () => {

    const getToken = localStorage.getItem('user');

    const splitToken = getToken?.split(' ')[1];
    const getUser = decodeJwt(splitToken);


    const [view, setView] = useState(false);
    // const [date, setDate] = useState({
    //     day:'',
    //     monthDate: '',
    //     monthName: '',
    //     year: '',
    //     hour: '',
    //     minute:'',
    //     second: ''
    // });
    const {location, navigate} = useHome();
    
    const mappingRoutes = location.split('/').slice(1)

    const handleRoute = (index) => {
        const findNavigation = mappingRoutes?.slice(0, index).join('/');
        navigate(`/${findNavigation}`)
     }
    // useEffect(() => {
    //     const daysOfWeek = [
    //         'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    //       ];
        
    //       const monthNames = [
    //         'January', 'February', 'March', 'April', 'May', 'June',
    //         'July', 'August', 'September', 'October', 'November', 'December'
    //       ];
    //     const getTime = new Date();
    //     const dayOfWeek = daysOfWeek[getTime.getDay()]
    //     const getMonthNames = monthNames[(getTime.getMonth())]
    //    setDate({...date, day: dayOfWeek, monthDate: getTime.getDate() ,monthName: getMonthNames, year: getTime.getFullYear(), hour: getTime.getHours(), minute: getTime.getMinutes(), second: getTime.getSeconds()  })
    // },[date])

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
                    {/* <p>{date.day}, {date.monthDate}  {date.monthName} {date.year}, {date.hour > 12 ? (date.hour - 12): date.hour === 0 ? 12 : date.hour}:{date.minute + 1}:{date.second < 10 ? ('0'+date.second) : date.second}  {date.hour >= 12 ? 'PM' : 'AM' }</p>  */}
                    <div onClick={() => setView(!view)} className={`${dashboardTitle.mappedRoute}`}>
                        <p><i style={{fontSize:"30px"}} className="uil uil-user-circle"></i></p>
                        <div style={{display: `${view ? 'block': 'none'}`}} className={`${dashboardTitle.userDetails}`}>
                            <h4>{getUser?.username}</h4>
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