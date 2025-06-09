/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import usePostEmployeeData from "../../../../data/employeeData/usePostEmployeeData";
import { toast } from "react-toastify";
// import { fetchPostemployeeData } from "../../../../data/fetchedData/fetchemployeeData";
// import { toast } from "react-toastify";

const useAddEmployee = () => {
    
    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);

    const {mutate:postEmployeeData, isSuccess, isError, isPending} = usePostEmployeeData()
    
    const initialEmployeeData = {
        employeeName: '',
        joiningDate: '',
        address: '',
        mobile: '',
        nid: '',
        employeeId: '',
        basicSalary: '',
        img: 'not added'
    }
    const [employeeData, setEmployeeData] = useState(initialEmployeeData);



    const findEmployee = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findEmployee) {
            setEmployeeData(findEmployee)
        }
    }, [setEmployeeData, findEmployee])


    

    const editProduct = (e) => {

        let modifiedData = { ...employeeData, img: imgHolder === '' ? 'not added' : imgHolder }
        console.log(modifiedData)
        e.preventDefault();
        setEdit(false)
        setShowData(showData.map((product, index) => {
            return (index + 1) === edit ? modifiedData : product
        }))
        setEmployeeData(initialEmployeeData)
        setImgHolder('')
    }

    const handleSubmit = (e) => {
        const allData = {
            ...employeeData,
            img: imgHolder === '' ? 'not added' : imgHolder
        }
        e.preventDefault();
        setShowData((prevData) => [...prevData, allData]);
        setEmployeeData(initialEmployeeData)
      
        setImgHolder('');
    }

    const handlePost = async () => {

        if (showData.length >= 1) {
          if(!isPending){
              postEmployeeData(showData)
          }
        }
    }

    useEffect(() => {
        if(isSuccess){
            setShowData([])
            setImgHolder(undefined)
            setEmployeeData(initialEmployeeData)
        }
    
        if(isError){
            toast.error(`something went wrong`)
        }
    },[isSuccess,isError])

    return { employeeData, setEmployeeData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct,  handleSubmit, initialEmployeeData, findEmployee, setImgHolder, uploading, setUploading, handlePost, isPending }
};


export default useAddEmployee;