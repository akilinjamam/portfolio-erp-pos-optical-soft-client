/* eslint-disable react-hooks/exhaustive-deps */
import dashFooter from './DashboardFooter.module.scss';
import '../../../global_style/global_style.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../modal/imgmodal/imgModalSlice';
import decodeJwt from '../../../jwtDecoder/jwtDecoder';
import { useEffect, useState, useRef } from 'react';

const DashboardFooter = () => {
    const [remainingTime, setRemainingTime] = useState(null);
    const dispatch = useDispatch();
    const branchId = useRef('');

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (!token) return;

        const splitToken = token.split(' ')[1];
        const decoded = decodeJwt(splitToken);
        const exp = decoded?.exp;
        branchId.current = decoded?.branchName;
        
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

            setRemainingTime({ 
                days: days.toString().padStart(2, '0'),
                hours: hours.toString().padStart(2, '0'), 
                minutes: minutes.toString().padStart(2, '0'), 
                seconds: seconds.toString().padStart(2, '0') 
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className={dashFooter.mainWrapper}>
            <div className={dashFooter.statusBar}>
                <div className={dashFooter.container}>
                    {/* Session Info */}
                    <div className={dashFooter.sessionInfo}>
                        <div className={`${dashFooter.pulseIndicator} ${remainingTime ? dashFooter.active : dashFooter.expired}`}></div>
                        {remainingTime ? (
                            <div className={dashFooter.timerWrapper}>
                                <span className={dashFooter.label}>Session Security</span>
                                <div className={dashFooter.countdown}>
                                    <span>{remainingTime.days}d</span>
                                    <span className={dashFooter.sep}>:</span>
                                    <span>{remainingTime.hours}h</span>
                                    <span className={dashFooter.sep}>:</span>
                                    <span>{remainingTime.minutes}m</span>
                                    <span className={dashFooter.sep}>:</span>
                                    <span className={dashFooter.seconds}>{remainingTime.seconds}s</span>
                                </div>
                                <span className={dashFooter.branchBadge}>
                                    <i className="uil uil-building"></i> {branchId.current}
                                </span>
                            </div>
                        ) : (
                            <span className={dashFooter.expiredText}>Session Expired</span>
                        )}
                    </div>

                    {/* Developer Credit */}
                    <div 
                        className={dashFooter.brandCredit} 
                        onClick={() => dispatch(openModal('developer-info'))}
                    >
                        <span className={dashFooter.poweredBy}>Powered by</span>
                        <div className={dashFooter.logoSmall}>
                            <span className={dashFooter.b}>BYTE</span>
                            <span className={dashFooter.d}>DYNAMO</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default DashboardFooter;