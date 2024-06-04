import Lottie from "react-lottie";
import Loading from "../../animation/loading.json";
import commonLoading from './CommonLoading.module.scss';
import '../../global_style/global_style.css'


const CommonLoading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: Loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div className={`${commonLoading.main} flex_center`}>
        <Lottie
             options={defaultOptions}
             height={100}
             width={100}
        ></Lottie>
     </div>
    );
};

export default CommonLoading;