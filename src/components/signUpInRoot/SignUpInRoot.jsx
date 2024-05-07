import { Link, Outlet, useLocation } from "react-router-dom";
import signupinroot from './SignInUpRoot.module.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpInRoot = () => {
    const location = useLocation().pathname;
    const allRoutes = [
        {
            path: '/login',
            element: 'Login'
        },
        {
            path: '/',
            element: 'Registration'
        }
    ]

    const getActive = (value) => {
        const isActive = value === location;
        return isActive ? signupinroot.active : ''
    }
    return (
        <div>
            <div className={signupinroot.main}>
                <ToastContainer style={{marginTop:'40px'}}/>
               <div className={`${signupinroot.container} flex_right`}>
                {
                    allRoutes?.map((route, index) => {
                        return(
                            <Link  className={`${signupinroot.link} ${getActive(route?.path)}`} style={{textDecoration: 'none'}} key={index + 1} to={route?.path}>{route?.element}</Link>
                        )
                    } )
                }
               </div>
            </div>
            <Outlet/>
        </div>
    );
};

export default SignUpInRoot;