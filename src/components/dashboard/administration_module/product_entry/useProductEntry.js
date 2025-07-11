import { useEffect, useState } from "react";
import { customCode } from "../../../customCode/customcode";
import useUserData from "../../../../data/userData/useUserData";
import useGetEmployeeData from "../../../../data/employeeData/useGetEmployeeData";
import useGetSupplierData from "../../../../data/supplierData/useGetSupplierData";
import usePostProductEntryData from "../../../../data/productEntryData/usePostProductEntryData";

const useProductEntry = () => {
    const { users } = useUserData()
    const { employeeData } = useGetEmployeeData();
    const { supplierData } = useGetSupplierData();
    const allEmployess = employeeData?.result?.sort((a, b) => a.employeeName.toLowerCase() > b.employeeName.toLowerCase() ? 1 : -1);
    const allSuppliers = supplierData?.result?.sort((a, b) => a.supplierName.toLowerCase() > b.supplierName.toLowerCase() ? 1 : -1);

    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
    const [imgHolder, setImgHolder] = useState('');
    const [uploading, setUploading] = useState(false);

    const recorderEmail = localStorage.getItem('userEmail')
    const recorderName = users?.result?.find(f => f?.email === recorderEmail)?.username

    console.log(showData);

    const initialProductData = {
        productName: '',
        salesPrice: '',
        purchasePrice: '',
        category: '',
        quantity: '',
        stockAmount: '',
        barcode: '',
        material: 'blank',
        frameType: 'blank',
        size: 'blank',
        shape: 'blank',
        img: '',
        power: '',
        sph: '',
        cyl: '',
        axis: '',
        supplierName: '',
        collectorName: ''
    }
    const [productData, setProductData] = useState(initialProductData);

    const [category, setCategory] = useState('');



    const findProduct = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findProduct) {
            setProductData(findProduct)
        }
    }, [setProductData, findProduct])


    const newCode = customCode(productData?.purchasePrice)

    const editProduct = (e) => {

        let modifiedData = { ...productData, stockAmount: productData?.quantity, barcode: newCode?.generatedCode, img: imgHolder === '' ? 'not added' : imgHolder }

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
            stockAmount: productData?.quantity,
            barcode: newCode.generatedCode,
            category,
            img: imgHolder === '' ? 'not added' : imgHolder,
            recorderEmail,
            recorderName,
            power: productData?.power === '' ? 'power not added' : productData?.power,
            sph: productData?.sph === '' ? 'sph not added' : productData?.sph,
            cyl: productData?.cyl === '' ? 'cyl not added' : productData?.cyl,
            axis: productData?.axis === '' ? 'axis not added' : productData?.axis,
        }

        e.preventDefault();
        setShowData((prevData) => [...prevData, allData]);
        // setProductData(initialProductData)
        setImgHolder('');

    }


    const { postProductData, isPending } = usePostProductEntryData(setShowData, setImgHolder, setProductData, initialProductData)

    const handlePost = async () => {

        if (showData.length >= 1) {
            if (!isPending) {
                postProductData(showData)
            }
        }
    }

    return { productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, category, setCategory, handleSubmit, initialProductData, findProduct, setImgHolder, uploading, setUploading, handlePost, allEmployess, allSuppliers, isPending }
};


export default useProductEntry;