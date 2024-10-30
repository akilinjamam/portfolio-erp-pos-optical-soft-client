import { useEffect, useState } from "react";
import useProductData from "../../../../data/productData/useProductData";
import { fetchDeleteProductData, fetchUpdateProductData } from "../../../../data/fetchedData/fetchProductData";
import { toast } from "react-toastify";
import { customCode } from "../../../customCode/customcode";


const useProductList = () => {

    const [query, setQuery] = useState('');
    const [range, setRange] = useState({
        from: '',
        to: '',
        priceFrom: '',
        priceTo: ''
    })
    const { products, isLoading, refetch } = useProductData(query, range.from, range.to, range.priceFrom, range.priceTo);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [modifiedProductDataWithIndexId, setModifiedProductWithIndexId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [newCustomCode, setNewCustomCode] = useState('');
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState('');
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);
    const [fullScr, setFullScr] = useState(false)
    const [selectDeleted, setSelectDeleted] = useState(false)
    const [idsForDelete, setIdsForDelete] = useState([]);
    const [stocks, setStocks] = useState('');



    const initialProductData = {
        supplierName: '',
        collectorName: '',
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
        img: '',
        power: ''
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

    const editProduct = async (e) => {
        e.preventDefault()
        const img = imgHolder ? imgHolder : updateProductData?.img

        const stock = Number(updateProductData?.quantity) > 0 ? true : false

        if (Number(updateProductData?.quantity) < 0) {
            toast.error('you can not decrease quantity less then 0')
            return
        }

        const updatedData = {
            supplierName: updateProductData?.supplierName,
            collectorName: updateProductData?.collectorName,
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
            img: img,
            inStock: stock,
            power: updateProductData?.power
        }
        await fetchUpdateProductData(edit, updatedData, refetch, toast, setUdpateProductData, initialProductData)
        setImgHolder('')
        setEdit('')
    }
    const [filteredByStock, setFilteredByStock] = useState([]);
    useEffect(() => {
        const filtered = products?.result?.filter(f => f?.inStock === stocks);
        setFilteredByStock(filtered)
    }, [products, stocks])


    const data = stocks === '' ? products?.result : filteredByStock

    useEffect(() => {
        const productAddedWithIndexId = data?.slice()?.reverse()?.map((d, i) => ({
            ...d, indexId: i + 1
        }))
        setModifiedProductWithIndexId(productAddedWithIndexId)
    }, [products, data])

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



    return { products, isLoading, updateProductData, setUdpateProductData, initialProductData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, imgHolder, setImgHolder, uploading, setUploading, editProduct, fullScr, setFullScr, modifiedProductDataWithIndexId, setQuery, query, selectDeleted, setSelectDeleted, idsForDelete, setIdsForDelete, deleteProducts, setStocks, range, setRange }
};
export default useProductList;