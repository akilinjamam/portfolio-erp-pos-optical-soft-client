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

//    const dispatch = useDispatch();

    // const [query, setQuery] = useState('');
    // const [range, setRange] = useState({
    //     from: '',
    //     to: ''
    // });
    const {data, isLoading, handleUpdateRequest, handleUpdateRole, handleUpdateRemove} = useUserList();
    // const [stocks, setStocks] = useState(true);
    
    // console.log(range)
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
                    {/* <i 
                    title="print preview"
                    className="uil uil-print"
                    onClick={() => {
                        dispatch(addStockData(filteredStock))
                        dispatch(openModal('stock'))
                    }}
                    ></i>
                    <input value={query} type="text" name="" id="" onChange={(e) => setQuery(e.target.value)}/>
                    <i onClick={() => setQuery('')} className="uil uil-times"></i>
                    <select value={stocks} name="" id="" onChange={(e) => setStocks(e?.target?.value === 'true') }>
                        <option value={true}>stock-in</option>
                        <option value={false}>stock-out</option>
                    </select>
                    <label htmlFor="">From :</label>
                    <input value={range.from} type="date" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>

                    <label htmlFor="">To :</label>
                    <input value={range.to} type="date" name="" id=""  onChange={(e) => setRange({...range, to: e.target.value})}/>
                    <i onClick={() => setRange({from: '', to: ''})} className="uil uil-times"></i> */}
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

