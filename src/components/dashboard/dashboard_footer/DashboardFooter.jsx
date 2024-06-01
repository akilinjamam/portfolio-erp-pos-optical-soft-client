import dashFooter from './DashboardFooter.module.scss';
import '../../../global_style/global_style.css'

const DashboardFooter = () => {
    return (
        <div className={dashFooter.main}>
            <div className={`${dashFooter.titleBar} flex_center`}>
                <div className={`${dashFooter.titleBarContainer}`}></div>
            </div>
        </div>
    )
}


export default DashboardFooter