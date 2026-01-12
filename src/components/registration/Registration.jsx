import signup from './Registration.module.scss';
import '../../global_style/global_style.css';
import logo from '../../images/logo.png';
import { allInputData } from './inputItems';
import useRegistration from './useRegistration';
import { fetchPostUserData } from '../../data/fetchedData/fetchUserData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registration = () => {
    
    const [user, setUser,  passwordStrength, countStrength, loading, setLoading, eye , setEye,] = useRegistration();
  
    const navigate = useNavigate();
    
 
    allInputData[2].icon = eye ? 'uil uil-eye' : 'uil uil-eye-slash';
    allInputData[2].type = eye ? 'text' : 'password';
    allInputData[3].type = eye ? 'text' : 'password';

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        
        const data = {
            username: user.username,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword
        }

        setLoading(true)

        await fetchPostUserData(data).then(res => {
            
            if(res?.data?.message){
                res.data?.error?.map(err => {
                    if(err.message === 'confirmPassword must be [ref:password]'){
                        setLoading(false)
                        toast.error('password did not match')
                    }else{
                        setLoading(false)
                        toast.error(err.message)
                    }
                })
            }
            if(res?.data?.status == 201){
                setLoading(false)
                navigate('/login')
            }
            if(res?.data?.status === 409){
                setLoading(false)
                toast.error(res?.data?.result)
                toast.error(res)
            }
        })
    }

    const getColor = () => {
        if (passwordStrength === 1) {
            return 'red'
        }
        if(passwordStrength === 2){
            return 'orange'
        }
        if(passwordStrength >= 3){
            return 'lightGreen'
        }
    }
    return (
        <div className={`${signup.main} flex_center`}>
            <div className={signup.container}>
                <img src={logo} alt="" />
                <div className={signup.registration_form}>
                    <h4>Sign up to start your session</h4>
                    <form onSubmit={handleSubmit}>
                        {
                            allInputData?.map((input, index) => {
                                return (
                                    <div key={index+1}>
                                        <input  type={input.type} name={input.name} id={input.id} placeholder={input.value_alt}
                                        onChange={(e) => {
                                            setUser({...user, [input.value] : e.target.value })
                                        }}                                       
                                        />
                                        <i onClick={() => {
                                            setEye(!eye)
                                        }} className={input.icon}></i>
                                    </div>
                                )
                            })
                        }          
                        <input className={signup.submit} type="submit" value={`${loading ? 'Loading...' : 'Sign Up'}`} required /> 
                        <p style={{color: `${getColor()}`}} className={signup.passwordStrength}>{passwordStrength > 0 && countStrength}</p> 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;