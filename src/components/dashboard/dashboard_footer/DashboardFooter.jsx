import dashFooter from './DashboardFooter.module.scss';
import '../../../global_style/global_style.css'
import { useDispatch } from 'react-redux';
import { openModal } from '../../modal/imgmodal/imgModalSlice';

const DashboardFooter = () => {
    const dispatch = useDispatch();
    return (
        <div className={dashFooter.main}>
            <div className={`${dashFooter.titleBar} flex_center`}>
                <div className={`${dashFooter.titleBarContainer} flex_right`}> <p onClick={() => dispatch(openModal('developer-info'))}>BYTE DYNAMO</p> </div>
            </div>
        </div>
    )
}


export default DashboardFooter