import { toast } from "react-toastify";

export const updloadCloudinaryImage = (imgFile, setImgHolder, setUploading) => {

    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", "smipgehv");
    data.append("cloud_name", "dw57lx7qa");

    setUploading(true)

    fetch("https://api.cloudinary.com/v1_1/dw57lx7qa/image/upload", {
        method: "post",
        body: data
    })
        .then(res => res.json())
        .then(res => {

            console.log(res)
            console.log(res?.url)
            setImgHolder(res?.url)
            setUploading(false)
            toast.success('image successfully')

        }).catch(err => {
            toast.error(err)
            setUploading(false)
        })
        .catch((error) => console.log(error));
}