import { useEffect, useState } from 'react';
import useHome from '../home/useHome';
import dashboardTitle from './DashboardTitleBar.module.scss';
const DashboardTitleBar = () => {
    const [date, setDate] = useState({
        day:'',
        monthDate: '',
        monthName: '',
        year: '',
        hour: '',
        minute:'',
        second: ''
    });
    const {location} = useHome();
  
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
    return (
        <div className={`${dashboardTitle.main}`}>
           <div className={`${dashboardTitle.titleBar} flex_center `}>
                <div className={`${dashboardTitle.titleBarContainer} flex_between`}>
                     <p>{location.toUpperCase().replace(/\//g, " > ").replace(/_/g, ' ')}</p>
                    {/* <p>{date.day}, {date.monthDate}  {date.monthName} {date.year}, {date.hour > 12 ? (date.hour - 12): date.hour === 0 ? 12 : date.hour}:{date.minute + 1}:{date.second < 10 ? ('0'+date.second) : date.second}  {date.hour >= 12 ? 'PM' : 'AM' }</p>  */}
                </div>
            </div>  
        </div>
    );
};

export default DashboardTitleBar;