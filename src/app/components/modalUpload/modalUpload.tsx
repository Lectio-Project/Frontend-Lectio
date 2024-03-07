import { useState } from "react";
import Button from "../Button/Button";
import { useDataContext } from "@/context/user";
import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";
import { storage } from "./fireBase";
import api from "@/api/api";
import './modalUpload.css'
import BackIcon from '../../assets/arrowBack.svg';


export default function UploadImage(){
    const { userData,
        setUserData,
        setShowModalImage,
        selectedImageUrl,
        setSelectedImageUrl
        } = useDataContext();

    const[imgUrl, setImgUrl] = useState('');
    const [progressUp, setProgressUp] = useState(0);
    

    async function  handleUpload(event: any){
        event.preventDefault();

        const file = event.target[0]?.files[0];

        if(!file){
            return console.log('file vazio')
        }

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
                setProgressUp(progress);
            },
            error =>{
                alert(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setImgUrl(url);
                    setSelectedImageUrl(url);
                })
            }
        )

        try {
            if(imgUrl){
                setUserData(userData => ({
                    ...userData,
                    imageUrl: imgUrl
                }));

                const response = await api.patch(`/users/${userData.id}`,{
                    imageUrl: imgUrl
                },
                {
                    headers: {
                    authorization: `Bearer ${userData.token}` ,
                    },
                }
                )

            }
            
        } catch (error) {
            console.log(error)
        }
    }
        const initialImage = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'

    return(
        <main>
            <div className="background-modal-img">

            <div className='back-area' onClick={()=> setShowModalImage(false)}>
                <img src={BackIcon} alt='icon back'/>
                <span>Voltar</span>
                </div>


            <div className='container-upload'>

            <img src={selectedImageUrl || initialImage} alt= 'previw' className="preview"/>    
            <form className="form-upload"  onSubmit={handleUpload} >
                <input type="file"/>

                <Button className="primary" type="submit" title="Enviar"  />
            </form>
            {!imgUrl && <progress value={progressUp} max='100'/>}

            </div>

            </div>

        </main>
    )
}