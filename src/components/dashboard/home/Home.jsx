import { useNavigate } from "react-router-dom";
import useUserData from "../../../data/userData/useUserData";



const Home = () => {

    const storedEmail = localStorage.getItem('userEmail');

  const navigate = useNavigate();
   const {users, isLoading, error} = useUserData();


   const findUser = users?.result?.find(f => {
    return f?.email === storedEmail;
   })

   console.log(findUser)

    const handleLogOut = () => {
        localStorage.removeItem('user');
        navigate('/login')
    }

    if(isLoading){
        return <p>loading...</p>
    }

    if(error){
        if (error === 'Request failed with status code 401') navigate('/login')
        return <p>{error}</p>
    }


    return (
        <div className="flex_center" style={{width:'100%', height:'100vh'}}>
            
            {/* {
                users?.result?.map(datas => {
                    return (
                        <p key={datas?.id}>{datas?.username}</p>
                    )
                })
            } */}

            <div style={{textAlign:'center'}}>
                <h1>welcome to optical soft.</h1>
                <p>we are working on it....</p>
                <br />
                <p ><button onClick={handleLogOut}>logout</button></p>
            </div>
        </div>
    );
};

export default Home;