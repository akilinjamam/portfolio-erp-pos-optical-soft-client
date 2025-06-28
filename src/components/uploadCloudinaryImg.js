import { toast } from "react-toastify";
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_UPLOAD_CLOUD_NAME;
export const updloadCloudinaryImage = (imgFile, setImgHolder, setUploading) => {

    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", `${uploadPreset}`);
    data.append("cloud_name", `${cloudName}`);

    setUploading(true)

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "post",
        body: data
    })
        .then(res => res.json())
        .then(res => {
            setImgHolder(res?.url)
            setUploading(false)
            toast.success('image successfully added')

        }).catch(err => {
            toast.error(err)
            setUploading(false)
        })
        .catch((error) => console.log(error));
}