import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loading from '../../animation/loading.json'
import Lottie from "react-lottie";
import loadingStyle from './Loading.module.scss';
const Loading = () => {
    const access = localStorage.getItem('user');
    const email = localStorage.getItem('userEmail');
   
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
           if(access && email){
            navigate('/dashboard');
           }
           if(email && !access){
            navigate('/login');
           }
        }, 2000);
    })

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };


    return (
        <div className={`${loadingStyle.main} flex_center`}>
           <Lottie
                options={defaultOptions}
                height={100}
                width={100}
           ></Lottie>
        </div>
    );
};

export default Loading;