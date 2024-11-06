
import employeeListReport from './EmployeeListReport.module.scss';
import { useDispatch } from "react-redux";
import {  addEmployeeList, openModal } from "../../../modal/imgmodal/imgModalSlice";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import { useEffect } from "react";
import EmployeeListReportTable from "./EmployeeListReportTable";
import useGetEmployeeData from '../../../../data/employeeData/useGetEmployeeData';
// import { fetchGetSaleData } from "../../../../data/fetchedData/fetchSaleData";

const EmployeeListReport = () => {

    const dispatch = useDispatch();
    const [range, setRange] = useState({
        from:'',
        to:''
    })
    const [query, setQuery] = useState('');

    const {employeeData, isLoading, refetch} = useGetEmployeeData(query, range.from, range.to);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId,setModifiedProductDataWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [paginatedIndex,setPaginatedIndex] = useState()
    
   
   

    useEffect(() => {
        const modified = employeeData?.result?.slice()?.reverse()?.map((item, index) => ({...item, indexId: index+1}))
        setModifiedProductDataWithIndexId(modified)
    }, [employeeData?.result])


    useEffect(() => {
        query
        range
        refetch()
    },[refetch, query, range])

    return (
        <div className={employeeListReport.main}>
            <div className={`${employeeListReport.title} flex_left`}>
                <i onClick={() => {
                    dispatch(addEmployeeList(employeeData?.result))
                    dispatch(openModal('employee'))
                  
                }} title="print" className="uil uil-print"></i>
                <span>Total : {employeeData?.length}</span>
                <input value={query} type="text" name="" id="" onChange={(e) => {
                    setQuery(e.target.value)
                     
                }}/>
                <i onClick={() => setQuery('')} className="uil uil-times"></i>
                <input style={{padding:'0 2px'}} placeholder="Basic Salary" value={range?.from}  type="number" name="" id="" onChange={(e) => setRange({...range, from: e.target.value})}/>
                    <label htmlFor="">To: </label>
                    <input style={{padding:'0 2px'}} placeholder="Basic Salary" value={range?.to}  type="number" name="" id="" onChange={(e) => setRange({...range, to: e.target.value})}/>
                    <i onClick={() => {
                      setRange({from: '', to: ''})
                    }}  className="uil uil-times"></i>
            </div>
            <div style={{overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'none', minHeight:'auto', maxHeight:'70vh'}}>
                <EmployeeListReportTable isLoading={isLoading} paginatedDataContainer={paginatedDataContainer}/>
            </div>
            {
                !isLoading
                &&
                <Pagination showData={modifiedProductDataWithIndexId} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={5}/>
            }
        </div>
    );
};

export default EmployeeListReport;