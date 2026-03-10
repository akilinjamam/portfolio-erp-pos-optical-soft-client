/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import usePostBranchData from "../../../../data/branchData/usePostBranchData";


const useAddBranch = () => {

    let [showData, setShowData] = useState([]);
    const [paginatedDataContainer, setPaginatedDataContainer] = useState([]);
    const [paginatedIndex, setPaginatedIndex] = useState();
    const [edit, setEdit] = useState();
    const [imgHolder, setImgHolder] = useState();
    const [uploading, setUploading] = useState(false);

    const { mutate: postBranchData, isSuccess, isError, isPending } = usePostBranchData()

    const initialBranchData = {
        name: '',
        nameBangla: '',
        address: '',
        phone: '',
    }
    const [branchData, setBranchData] = useState(initialBranchData);



    const findBranch = showData.find((f, i) => (i + 1) === edit);
    useEffect(() => {
        if (findBranch) {
            setBranchData(findBranch)
        }
    }, [setBranchData, findBranch])

    const editProduct = (e) => {

        let modifiedData = { ...branchData, img: imgHolder === '' ? 'not added' : imgHolder }
        console.log(modifiedData)
        e.preventDefault();
        setEdit(false)
        setShowData(showData.map((product, index) => {
            return (index + 1) === edit ? modifiedData : product
        }))
        setBranchData(initialBranchData)
        setImgHolder('')
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setShowData((prevData) => [...prevData, branchData]);
        // setBranchData(initialBranchData)

        setImgHolder('');
    }

    const handlePost = async () => {

        if (showData.length >= 1) {
            console.log(showData)
            if (!isPending) {
                postBranchData(showData)
            }
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setShowData([])
            setImgHolder(undefined)
            // setBranchData(initialBranchData)
        }

    }, [isSuccess, isError])

    return { branchData, setBranchData, showData, setShowData, paginatedDataContainer, setPaginatedDataContainer, paginatedIndex, setPaginatedIndex, edit, setEdit, editProduct, handleSubmit, initialBranchData, findBranch, setImgHolder, uploading, setUploading, handlePost, isPending }
};


export default useAddBranch;