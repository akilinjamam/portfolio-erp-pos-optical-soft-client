import { useEffect, useState } from "react";

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
        const date = new Date();
        const year = date.getFullYear()
        const month = date.getMonth();
        const monthDate = date.getDate();
        const ddmmyy = `${monthDate}-${month}-${year}`

        const alphabetMap = {
            '1': 'K',
            '2': 'E',
            '3': 'Y',
            '4': 'R',
            '5': 'G',
            '6': 'H',
            '7': 'N',
            '8': 'O',
            '9': 'D',
            '0': 'X'
        };

        let convertedString = '';
        for (let digit of productData.salesPrice) {
            // eslint-disable-next-line no-prototype-builtins
            if (alphabetMap.hasOwnProperty(digit)) {
                convertedString += alphabetMap[digit];
            } else {
                // If the digit is not mapped, keep it as is
                convertedString += digit;
            }
        }

        const generatedCode = `${convertedString}${productData?.material.slice(0, 1)}${productData?.frameType.slice(0, 1)}${productData?.size.slice(0, 1)}${productData?.shape.slice(0, 1)}${date.getTime()}`

        setProductData({ ...productData, 'barcode': generatedCode, 'date': ddmmyy, 'img': findProduct?.img ? findProduct?.img : imgHolder })

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

    return { productData, setProductData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialProductData, findProduct, setImgHolder, uploading, setUploading }
};


export default useProductEntry;