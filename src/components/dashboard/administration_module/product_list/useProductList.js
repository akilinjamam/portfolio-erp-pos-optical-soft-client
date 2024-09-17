import { useEffect, useState } from "react";
import useProductData from "../../../../data/productData/useProductData";
import { fetchDeleteProductData, fetchUpdateProductData } from "../../../../data/fetchedData/fetchProductData";
import { toast } from "react-toastify";
import { customCode } from "../../../customCode/customcode";


const useProductList = () => {

    const [query, setQuery] = useState('');
    const { products, isLoading, refetch } = useProductData(query);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId, setModifiedProductWithIndexId] = useState([])
    const [newCustomCode, setNewCustomCode] = useState('');
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);
    const [fullScr, setFullScr] = useState(false)
    const [selectDeleted, setSelectDeleted] = useState(false)
    const [idsForDelete, setIdsForDelete] = useState([]);


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
        const newCode = customCode()
        setNewCustomCode(newCode.generatedCode)
    }, [updateProductData])
    console.log(newCustomCode)

    const editProduct = async (e) => {
        e.preventDefault()

        const img = imgHolder ? imgHolder : updateProductData?.img

        const updatedData = {
            productName: updateProductData?.productName,
            salesPrice: updateProductData?.salesPrice,
            purchasePrice: updateProductData?.purchasePrice,
            category: updateProductData?.category,
            quantity: updateProductData?.quantity,
            barcode: updateProductData?.barcode,
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

    useEffect(() => {
        const productAddedWithIndexId = products?.result?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedProductWithIndexId(productAddedWithIndexId)
    }, [products])

    useEffect(() => {
        setQuery(query)
        refetch
    }, [query, refetch])

    const deleteProducts = async (e) => {
        e.preventDefault()
        await fetchDeleteProductData(idsForDelete, refetch, toast)
        setIdsForDelete([])
        setSelectDeleted(false)

    }



    return { products, isLoading, updateProductData, setUdpateProductData, initialProductData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr, modifiedProductDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts }
};
export default useProductList;