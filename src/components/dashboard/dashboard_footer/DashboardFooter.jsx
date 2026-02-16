import dashFooter from './DashboardFooter.module.scss';
import '../../../global_style/global_style.css';
// import { useDispatch } from 'react-redux';
// import { openModal } from '../../modal/imgmodal/imgModalSlice';
import decodeJwt from '../../../jwtDecoder/jwtDecoder';
import { useEffect, useState } from 'react';



const DashboardFooter = () => {
    const [remainingTime, setRemainingTime] = useState(null);
    // const dispatch = useDispatch();
  
    useEffect(() => {
        const token = localStorage.getItem('user');
        if (!token) return;

        const splitToken = token.split(' ')[1];
        const exp = decodeJwt(splitToken)?.exp;
        if (!exp) return;

        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const diff = exp - now;

            if (diff <= 0) {
                clearInterval(interval);
                setRemainingTime(null);
                return;
            }

            const days = Math.floor(diff / (60 * 60 * 24)) || 0;
            const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60)) || 0;
            const minutes = Math.floor((diff % (60 * 60)) / 60) || 0;
            const seconds = Math.floor(diff % 60) || 0;

            setRemainingTime({ days:days?.toString()?.padStart(2, '00') ,hours: hours?.toString()?.padStart(2, '00') , minutes: minutes?.toString()?.padStart(2,'00'), seconds: seconds?.toString()?.padStart(2, '00') });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={dashFooter.main}>
            <div className={`${dashFooter.titleBar} flex_center`}>
                <div className={`${dashFooter.titleBarContainer} flex_between`}>
                     {remainingTime
                        ?
                        <p className={`${dashFooter.displayExpire}`}>
                            Session Expires in: {remainingTime?.days}  :{remainingTime?.hours} : {remainingTime?.minutes}:  {remainingTime?.seconds}
                        </p>
                        :
                        <p>Session Expired</p>
                    }
                    {/* <p onClick={() => dispatch(openModal('developer-info'))}>BYTE DYNAMO</p> */}
                </div>
            </div>
        </div>
    );
};

export default DashboardFooter;
