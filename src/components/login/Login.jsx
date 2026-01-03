import useLogin from "./useLogin";
import signin from './Login.module.scss';
import logo from '../../images/logo.png';
import { allInputLoginData } from "./logInputItems";
import { fetchPostLoginData } from "../../data/fetchedData/fetchLoginData";
import { useNavigate } from "react-router-dom";
import brandImage from '../../images/Byte-Dynamo-without-bg.png'
import { toast } from "react-toastify";

const Login = () => {

    const [user, setUser, loading, setLoading, eye,setEye] = useLogin();
    const navigate = useNavigate();

    console.log(user)

    allInputLoginData[1].icon = eye ? 'uil uil-eye' : 'uil uil-eye-slash';
    allInputLoginData[1].type = eye ? 'text' : 'password';

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            username: user.username,
            password: user.password
        }
        setLoading(true)
        await fetchPostLoginData(data).then(res => { 
            if(res?.data?.error){
                setLoading(false)
                res?.data?.error?.map(error => {
                 toast.error(error?.message)
                })
            }
            setLoading(false)
            toast.success(res?.data?.result)
           
            if(res?.data?.status == 200){
                toast(res?.data?.result)
                setLoading(false)
                navigate('/dashboard')
            }
        }).catch(error => {
            setLoading(false)
            toast(error?.message)

        })
    }
    return (
        <div className={`${signin.main} flex_center`}>
            <div className={signin.container}>
                <img src={logo} alt="" />
                <p style={{color: 'white'}}></p>
              
                <div className={signin.registration_form}>
                    <h4>Sign in to start your session</h4>
                    <form onSubmit={handleSubmit}>
                        {
                            allInputLoginData?.map((input, index) => {
                                return (
                                    <div key={index+1}>
                                        <input value={user?.[input.value]} type={input.type} name={input.name} id={input.id} placeholder={input.value_alt}
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
                        <div className={`${signin.forget_pass} flex_right`}>
                            <p>Forgot Password?</p>
                        </div>
                        <input className={signin.submit} type="submit" value={`${loading ? 'Loading...' : 'Sign In'}`} required />
                    </form>
                    <br />
                    <div>
                        <h5 >Developed By</h5>
                        <img style={{width: '200px', height:'63px'}}  src={brandImage} alt="" />
                    </div>
                </div>
            </div>
            <div className={`${signin.displayWidthLimitControll}`}>
                <div className="flex_center">
                    <p>Screen Size must have to be more than 1242px</p>
                </div>
            </div>
        </div>
    );
};

export default Login;