
import { useState } from 'react';
import controllUser from './ControllUserAccess.module.scss'
import ControllUserAccessTable from './ControllUserAccessTable';
import useControllUserAccess from './useControllUserAccess';

const ControllUserAccess = () => {
    const [userInfo,setUserInfo] = useState('')
    const { isLoading, data, mutation, handleUpdate, access, setAccess} = useControllUserAccess(userInfo);
 
    const findUser = data?.result?.find( item => item?._id === userInfo )

   

    return (
        <div className={`${controllUser.main}`}>
           <div className={`${controllUser.title}`}>
            <select name="" id="" onChange={(e) => setUserInfo(e.target.value)}>
                <option value="">find by user</option>
                { !isLoading
                    ?
                    data?.result?.map((item, index) => <option key={index+1} value={item?._id}>{item?.username}</option> )
                    :
                    <option value="">loading...</option>
                }
            </select>
        </div>
        <ControllUserAccessTable paginatedDataContainer={findUser} setUserInfo={setUserInfo} mutation={mutation} handleUpdate={handleUpdate} access={access} setAccess={setAccess}/>
        
        </div>
    );
};

export default ControllUserAccess;