/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import "./SidebarRes.scss";
import { homeNavigator } from "../homeNavigator";
import { useNavigate } from "react-router-dom";
import useHome from "../useHome";

export default function Sidebar() {

        const navigate = useNavigate();

        const {location} = useHome()

        const [open, setOpen] = useState(false);
        const [date, setDate] = useState(new Date());

        const formattedDate = useMemo(() => {
             const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
             const monthNames = [
                 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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


        const activeRoute = (routes) => {  
                const links = routes
                const active = links?.some(path => location === path)
                 return active ? `green` : ``
            }

  return (
    <>
      {/* Toggle Button (Only visible <=1242px) */}

      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <button className="sidebar-toggle" onClick={() => setOpen(true)}>
            ☰
            <p style={{fontSize:'14px'}}>{formattedDate.day}, {formattedDate.monthDate} {formattedDate.monthName} {formattedDate.year},{" "}
                {date.getHours() % 12 || 12}:{String(date.getMinutes()).padStart(2, "0")}:
                {String(date.getSeconds()).padStart(2, "0")} {date.getHours() >= 12 ? 'PM' : 'AM'}
            </p>
        </button>
        
      </div>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${open ? "active" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div>
            <p>MENU</p>
            <p className="close-btn" onClick={() => setOpen(false)}>
                ✕
            </p>
        </div>

        {
            homeNavigator.map((item, index) => {
                return (
                    <nav key={index}>
                       
                        <a style={{color: `${activeRoute(item.routes)}`}} onClick={() => {
                            navigate(item.route)
                            setOpen(false)
                        } } > <i className={item.icon}></i> {item?.value}</a>
                        
                    </nav>
                )
            })
            
        }
        <nav>
            <a onClick={() => {
                localStorage.removeItem('userEmail');
                localStorage.removeItem('user');
                navigate('/login')
            }}><i className="uil uil-sign-out-alt"></i> Logout</a>
        </nav>
      </aside>
    </>
  );
}
