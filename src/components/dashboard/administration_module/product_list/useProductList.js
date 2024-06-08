import { useEffect, useState } from "react";
import useProductData from "../../../../data/productData/useProductData";
import { fetchUpdateProductData } from "../../../../data/fetchedData/fetchProductData";
import { toast } from "react-toastify";
import { customCode } from "../../../customCode/customcode";


const useProductList = () => {

    const { products, isLoading, refetch } = useProductData();
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [newCustomCode, setNewCustomCode] = useState('');
    const [newDate, setNewDate] = useState('')
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);
    const [fullScr, setFullScr] = useState(false)
    const initialProductData = {
        productName: '',
        salesPrice: '',
        purchasePrice: '',
        category: '',
        quantity: '',
        date: '',
        barcode: '',
        material: '',
        frameType: '',
        size: '',
        shape: '',
        img: ''
    }

    const [updateProductData, setUdpateProductData] = useState(initialProductData);
    const findProductList = products?.result?.find(f => f?._id === edit)

    useEffect(() => {
        setUdpateProductData(findProductList || '')
    }, [findProductList])

    // converting number to alphubet and generating unique code using Date
    useEffect(() => {
        const newCode = customCode(updateProductData)
        setNewCustomCode(newCode.generatedCode)
        setNewDate(newCode.ddmmyy)

    }, [updateProductData])

    const editProduct = async (e) => {
        e.preventDefault()

        const img = imgHolder ? imgHolder : updateProductData?.img

        const updatedData = {
            productName: updateProductData?.productName,
            salesPrice: updateProductData?.salesPrice,
            purchasePrice: updateProductData?.purchasePrice,
            category: updateProductData?.category,
            quantity: updateProductData?.quantity,
            date: newDate,
            barcode: newCustomCode,
            material: updateProductData?.material,
            frameType: updateProductData?.frameType,
            size: updateProductData?.size,
            shape: updateProductData?.shape,
            img: img
        }

        await fetchUpdateProductData(edit, updatedData, refetch, toast)
        setImgHolder('')
        setEdit('')
    }

    return { products, isLoading, updateProductData, setUdpateProductData, initialProductData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr }
};
export default useProductList;