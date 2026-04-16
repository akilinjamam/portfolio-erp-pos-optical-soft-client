/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import useHome from '../home/useHome';
import dashboardTitle from './DashboardTitleBar.module.scss';
import decodeJwt from '../../../jwtDecoder/jwtDecoder';
import Sidebar from '../home/sidebarRes/SidebarRes';

const DashboardTitleBar = ({ showUser }) => {
    const getToken = localStorage.getItem('user');
    const splitToken = getToken?.split(' ')[1];
    const getUser = useMemo(() => decodeJwt(splitToken), [splitToken]);

    const [view, setView] = useState(false);
    const [date, setDate] = useState(new Date());
    const { location, navigate } = useHome();

    const mappingRoutes = location.split('/').slice(1);

    const handleRoute = (index) => {
        const findNavigation = mappingRoutes?.slice(0, index).join('/');
        navigate(`/${findNavigation}`);
    };

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedDate = useMemo(() => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
            day: daysOfWeek[date.getDay()],
            monthDate: date.getDate(),
            monthName: monthNames[date.getMonth()],
            year: date.getFullYear(),
            time: `${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")} ${date.getHours() >= 12 ? 'PM' : 'AM'}`
        };
    }, [date]);

    return (
        <div className={dashboardTitle.mainWrapper}>
            <div className={dashboardTitle.topHeader}>
                {/* Left: Breadcrumbs */}
                <div className={dashboardTitle.breadcrumbArea}>
                    <i className="uil uil-estate"></i>
                    {mappingRoutes?.map((route, index) => (
                        <span 
                            className={dashboardTitle.routeStep} 
                            onClick={() => handleRoute(index + 1)} 
                            key={index}
                        >
                            <i className="uil uil-angle-right"></i>
                            {route.replace(/_/g, ' ')}
                        </span>
                    ))}
                </div>

                {/* Right: Date & Profile */}
                <div className={dashboardTitle.actionArea}>
                    <div className={dashboardTitle.clockContainer}>
                        <span className={dashboardTitle.datePart}>{formattedDate.day}, {formattedDate.monthDate} {formattedDate.monthName}</span>
                        <span className={dashboardTitle.timePart}>{formattedDate.time}</span>
                    </div>

                    <div className={dashboardTitle.profileTrigger} onClick={() => setView(!view)}>
                        <div className={dashboardTitle.avatar}>
                            {getUser?.username?.charAt(0).toUpperCase()}
                        </div>
                        <i className={`uil uil-angle-down ${view ? dashboardTitle.rotate : ''}`}></i>

                        {/* Dropdown Menu */}
                        {view && (
                            <div className={dashboardTitle.userDropdown}>
                                <div className={dashboardTitle.dropdownHeader}>
                                    <p className={dashboardTitle.welcome}>Signed in as</p>
                                    <h4 className={dashboardTitle.userName}>{getUser?.username}</h4>
                                </div>
                                
                                <div className={dashboardTitle.dropdownContent}>
                                    {/* <button onClick={() => navigate('/profile')} className={dashboardTitle.menuItem}>
                                        <i className="uil uil-user"></i> My Profile
                                    </button> */}
                                    <button onClick={() => {
                                        localStorage.removeItem('userEmail');
                                        localStorage.removeItem('user');
                                        navigate('/login');
                                    }} className={`${dashboardTitle.menuItem} ${dashboardTitle.logout}`}>
                                        <i className="uil uil-sign-out-alt"></i> Logout
                                    </button>
                                </div>

                                {getUser?.username === 'test user' && (
                                    <div className={dashboardTitle.activeUsersSection}>
                                        <p className={dashboardTitle.sectionTitle}>Active Users</p>
                                        {showUser?.map((user, index) => (
                                            <div className={dashboardTitle.userItem} key={index}>
                                                <span className={dashboardTitle.statusDot}></span>
                                                {user}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>
    );
};

export default DashboardTitleBar;