import { useEffect, useState } from "react";
import { fetchPostProductData } from "../../../../data/fetchedData/fetchProductData";
import { toast } from "react-toastify";
import { customCode } from "../../../customCode/customcode";
import useUserData from "../../../../data/userData/useUserData";
import useGetEmployeeData from "../../../../data/employeeData/useGetEmployeeData";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";

const useProductEntry = () => {
    const { users } = useUserData()
    const { employeeData } = useGetEmployeeData();
    const { supplierData } = useGetSupplierData();
    const allEmployess = employeeData?.result;
    const allSuppliers = supplierData?.result;
    console.log(employeeData)
    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);

    const recorderEmail = localStorage.getItem('userEmail')
    const recorderName = users?.result?.find(f => f?.email === recorderEmail)?.username

    const initialProductData = {
        productName: '',
        salesPrice: '',
        purchasePrice: '',
        category: '',
        quantity: '',
        barcode: '',
        material: 'blank',
        frameType: 'blank',
        size: 'blank',
        shape: 'blank',
        img: 'not added',
        power: '0',
        supplierName: '',
        collectorName: ''
    }
    const [productData, setProductData] = useState(initialProductData);
    console.log(productData)
    const [category, setCategory] = useState('');


    const findProduct = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findProduct) {
            setProductData(findProduct)
        }
    }, [setProductData, findProduct])


    const newCode = customCode()

    const editProduct = (e) => {

        let modifiedData = { ...productData, barcode: newCode.generatedCode, img: imgHolder === '' ? 'not added' : imgHolder }
        console.log(modifiedData)
        e.preventDefault();
        setEdit(false)
        setShowData(showData.map((product, index) => {
            return (index + 1) === edit ? modifiedData : product
        }))
        setProductData(initialProductData)
        setImgHolder('')
    }

    const handleSubmit = (e) => {
        const allData = {
            ...productData,
            barcode: newCode.generatedCode,
            category,
            img: imgHolder === '' ? 'not added' : imgHolder,
            recorderEmail,
            recorderName
        }

        e.preventDefault();
        setShowData((prevData) => [...prevData, allData]);
        setProductData(initialProductData)
        setCategory('')
        setImgHolder('');

    }

    const handlePost = async () => {

        if (showData.length >= 1) {

            await fetchPostProductData(showData).then(res => {
                if (res?.data?.success === true) {
                    toast.success('product added successfully');
                    setShowData([])
                    setImgHolder(undefined)
                    setProductData(initialProductData)
                }
                if (res?.data?.error) {
                    console.log(res?.data)
                    toast.error(`${res.data.error?.map(err => err.message.slice(4))}`)

                }
            })
        }
    }

    return { productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, category, setCategory, handleSubmit, initialProductData, findProduct, setImgHolder, uploading, setUploading, handlePost, allEmployess, allSuppliers }
};


export default useProductEntry;