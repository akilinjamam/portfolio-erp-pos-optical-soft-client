/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import usePostSupplierData from "../../../../data/supplierData/usePostSupplierData";

const useAddSupplier = () => {
    
    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);

    const {mutate:postSupplierData, isSuccess, isError} = usePostSupplierData()
    
    const initialSupplierData = {
        supplierName: '',
        address: '',
        mobile: '',
        img: 'not added'
    }
    const [supplierData, setSupplierData] = useState(initialSupplierData);



    const findSupplier = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findSupplier) {
            setSupplierData(findSupplier)
        }
    }, [setSupplierData, findSupplier])


    

    const editProduct = (e) => {

        let modifiedData = { ...supplierData}
       
        e.preventDefault();
        setEdit(false)
        setShowData(showData.map((product, index) => {
            return (index + 1) === edit ? modifiedData : product
        }))
        setSupplierData(initialSupplierData)
        setImgHolder('')
    }

    const handleSubmit = (e) => {
        const allData = {
            ...supplierData,
            img: imgHolder === '' ? 'not added' : imgHolder
        }
        e.preventDefault();
        setShowData((prevData) => [...prevData, allData]);
        setSupplierData(initialSupplierData)
      
        setImgHolder('');
    }

    const handlePost = async () => {

        if (showData.length >= 1) {
            postSupplierData(showData)
        }
    }

    useEffect(() => {
        if(isSuccess){
            setShowData([])
            setImgHolder(undefined)
            setSupplierData(initialSupplierData)
        }
    
        if(isError){
            toast.error(`something went wrong`)
        }
    },[isSuccess,isError])

    return { supplierData, setSupplierData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct,  handleSubmit, initialSupplierData, findSupplier, setImgHolder, uploading, setUploading, handlePost }
};


export default useAddSupplier;