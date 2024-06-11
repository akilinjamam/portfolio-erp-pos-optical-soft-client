import { useEffect, useState } from "react";
import { fetchPostProductData } from "../../../../data/fetchedData/fetchProductData";
import { toast } from "react-toastify";
import { customCode } from "../../../customCode/customcode";

const useProductEntry = () => {
    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);


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
    const [productData, setProductData] = useState(initialProductData);


    const findProduct = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findProduct) {
            setProductData(findProduct)
        }
    }, [setProductData, findProduct])


    // converting number to alphubet and generating unique code using Date
    useEffect(() => {
        const newCode = customCode(productData)
        setProductData({ ...productData, 'barcode': newCode.generatedCode, 'date': newCode.ddmmyy, 'img': findProduct?.img ? findProduct?.img : imgHolder })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productData, imgHolder])



    const editProduct = (e) => {
        e.preventDefault();

        setShowData(showData.map((product, index) => {
            return (index + 1) === edit ? productData : product
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowData((prevData) => [...prevData, productData]);
        // setProductData(initialProductData)

    }

    const handlePost = async () => {
        console.log(showData)
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

    return { productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialProductData, findProduct, setImgHolder, uploading, setUploading, handlePost }
};


export default useProductEntry;