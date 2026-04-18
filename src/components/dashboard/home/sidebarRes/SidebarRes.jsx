/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import "./SidebarRes.scss";
import { homeNavigator } from "../homeNavigator";
import { useNavigate } from "react-router-dom";
import useHome from "../useHome";
import decodeJwt from "../../../../jwtDecoder/jwtDecoder";

export default function Sidebar() {
    const token = localStorage.getItem('user');
    const splitToken = token?.split(' ')[1];
    const branchName = token ? decodeJwt(splitToken)?.branchName : "Branch Name";
    const navigate = useNavigate();

    const { location } = useHome()
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    const formattedDate = useMemo(() => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
            day: daysOfWeek[date.getDay()],
            monthDate: date.getDate(),
            monthName: monthNames[date.getMonth()],
            year: date.getFullYear(),
        };
    }, [date]);

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const activeRoute = (routes) => {
        const active = routes?.some(path => location === path)
        return active ? `active-link` : ``
    }

    return (
        <>
            {/* Top Navigation Bar for Mobile/Tablet */}
            <div className="mobile-top-nav">
                <button className="sidebar-toggle" onClick={() => setOpen(true)}>
                    <i className="uil uil-bars"></i>
                    <p style={{fontSize:'14px'}}>{formattedDate.day}, {formattedDate.monthDate} {formattedDate.monthName} {formattedDate.year},{" "}
                {date.getHours() % 12 || 12}:{String(date.getMinutes()).padStart(2, "0")}:
                {String(date.getSeconds()).padStart(2, "0")} {date.getHours() >= 12 ? 'PM' : 'AM'}
            </p>
                </button>
            </div>

            {/* Overlay */}
            <div className={`sidebar-overlay ${open ? "active" : ""}`} onClick={() => setOpen(false)} />

            {/* Sidebar */}
            <aside className={`sidebar ${open ? "open" : ""}`}>
                {/* Brand Header */}
                <div className="sidebar-brand">
                    <div className="logo-box">
                        <span className="logo-icon">SN</span>
                    </div>
                    <div className="brand-text">
                        <span className="brand-top">Software</span>
                        <span className="brand-bottom">Name</span>
                    </div>
                    <i className="uil uil-multiply close-icon" onClick={() => setOpen(false)}></i>
                </div>

                {/* Branch Info */}
                <div className="branch-info">
                    <i className="uil uil-map-marker"></i>
                    <span>{branchName?.length > 20 ? branchName?.slice(0, 20) + '...' : branchName}</span>
                </div>

                <div className="nav-container">
                    {homeNavigator.map((item, index) => (
                        <nav key={index}>
                            <a className={activeRoute(item.routes)} onClick={() => {
                                navigate(item.route)
                                setOpen(false)
                            }}>
                                <i className={item.icon}></i>
                                <span>{item?.value}</span>
                            </a>
                        </nav>
                    ))}
                </div>

                <div style={{cursor:"pointer"}} className="sidebar-footer">
                    <nav>
                        <a className="logout-btn" onClick={() => {
                            localStorage.removeItem('userEmail');
                            localStorage.removeItem('user');
                            navigate('/login')
                        }}>
                            <i className="uil uil-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </nav>
                </div>
            </aside>
        </>
    );
}