
import { useState } from 'react';
import controllUser from './ManageBranch.module.scss'
import ManageBranchTable from './ManageBranchTable';
import useManageBranch from './useManageBranch';

const ManageBranch = () => {
    const [userInfo,setUserInfo] = useState('')
    const { isLoading, data, mutation, handleUpdate, manageBranches, setManageBranches} = useManageBranch(userInfo);
 
    const findUser = data?.result?.find( item => item?._id === userInfo )

   console.log(data?.result)

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
        <ManageBranchTable manageBranches={manageBranches} setManageBranches={setManageBranches} paginatedDataContainer={findUser} setUserInfo={setUserInfo} mutation={mutation} handleUpdate={handleUpdate}/>
        
        </div>
    );
};

export default ManageBranch;