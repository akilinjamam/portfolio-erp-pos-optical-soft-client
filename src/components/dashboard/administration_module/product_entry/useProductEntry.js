import { useEffect, useMemo, useState } from "react";
import { fetchPostProductData } from "../../../../data/fetchedData/fetchProductData";
import { toast } from "react-toastify";
import { customCode } from "../../../customCode/customcode";
import useUserData from "../../../../data/userData/useUserData";

const useProductEntry = () => {
    const { users } = useUserData()
    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);

    // const recorderEmail = localStorage.getItem('userEmail')
    // const recorderName = users?.result?.find(f => f?.email === recorderEmail)?.username

    const recorderEmail = useMemo(() => localStorage.getItem('userEmail'), []);
    const recorderName = useMemo(() => users?.result?.find(f => f?.email === recorderEmail)?.username, [users, recorderEmail]);


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
        img: 'not added'
    }
    const [productData, setProductData] = useState(initialProductData);

    const [category, setCategory] = useState('');


    const findProduct = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findProduct) {
            setProductData(findProduct)
        }
    }, [findProduct])

    // converting number to alphubet and generating unique code using Date
    useEffect(() => {
        const newCode = customCode();
        setProductData(prevData => ({
            ...prevData,
            barcode: newCode.generatedCode,
            img: findProduct?.img || imgHolder
        }));
    }, [imgHolder, findProduct]);



    const editProduct = (e) => {
        e.preventDefault();
        setEdit(false)
        setShowData(showData.map((product, index) => {
            return (index + 1) === edit ? productData : product
        }))
    }

    const handleSubmit = (e) => {
        const allData = {
            ...productData,
            category,
            recorderEmail,
            recorderName
        }

        e.preventDefault();
        setShowData((prevData) => [...prevData, allData]);
        setProductData(initialProductData)
        setCategory('')

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

    return { productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, category, setCategory, handleSubmit, initialProductData, findProduct, setImgHolder, uploading, setUploading, handlePost }
};


export default useProductEntry;