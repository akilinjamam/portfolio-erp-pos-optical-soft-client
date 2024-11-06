import userList from  './UserList.module.scss'
import Pagination from "../../pagination/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import CommonLoading from "../../../commonLoagin/CommonLoading";
// import { useDispatch } from "react-redux";
// import { addStockData, openModal } from "../../../modal/imgmodal/imgModalSlice";
import UserListTable from "./UserListTable";
import useUserList from './useUserList';


const UserList = () => {

    const {data, isLoading, handleUpdateRequest, handleUpdateRole, handleUpdateRemove} = useUserList();
   
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [reversedUserList, seReversedUserList] = useState([]);
    
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId, setModifiedProductDataWithIndexId] = useState([])
    
    useEffect(() => {
        const reversedUserList = data?.result?.slice()?.reverse()?.filter(f => f?.role === 'user')
        seReversedUserList(reversedUserList)
    },[data])

       useEffect(() => {
        const modified = reversedUserList?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    },[reversedUserList])

    if(isLoading){
        return <CommonLoading/>
    }
    
    return (
        <div className={`${userList.main}`} >
            <div className={`${userList.titleBar} flex_left`}>
                <div className={`${userList.titleBarContainer}`}>
                   
                </div>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none' ,width:"99.5%", minHeight:'auto', maxHeight:'70vh'}}>
                <UserListTable paginatedDataContainer={paginatedDataContainer} handleUpdateRequest={handleUpdateRequest} handleUpdateRemove={handleUpdateRemove} handleUpdateRole={handleUpdateRole}/>
            </div>
            <Pagination showData={modifiedProductDataWithIndexId} setPaginatedIndex={setPaginatedIndex} setPaginatedDataContainer={setPaginatedDataContainer} limit={5}  />
        </div>
    );
};

export default UserList;

