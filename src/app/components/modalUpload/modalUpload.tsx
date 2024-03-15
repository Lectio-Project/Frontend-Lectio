import Button from "../Button/Button";

import CloseIcon from '../../assets/closeIcon.svg';

import { useRef, useState } from "react";
import { useDataContext } from "@/context/user";
import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";
import { storage } from "./fireBase";
import api from "@/api/api";
import './modalUpload.css';


export default function UploadImage(){
    const { userData,
        setUserData,
        setShowModalImage,
        selectedImageUrl,
        setSelectedImageUrl,
        } = useDataContext();

    const[imgUrl, setImgUrl] = useState('');
    const [progressUp, setProgressUp] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null)
    

    async function  handleUpload(event: any){
        event.preventDefault();

        const file = event.target.files[0];

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

                if(response.data.status===200){
                    setShowModalImage(false);
                }
                
            }
            
        } catch (error) {
            console.log(error)
        }
    }
        const initialImage = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'

    return(
        <main>
            <div className="background-modal-img">


            <div className='container-upload'>

            <div className="close-area">
                <img src={CloseIcon} alt='icon for close' onClick={()=> setShowModalImage(false)}/>
            </div>

            <div className="text-area">
            <span>Alterar foto</span>
            </div>
            
            <form className="form-upload"  onSubmit={handleUpload} >
            <input ref={fileInputRef} type="file" style={{display: 'none'}} onChange={handleUpload} />

                <Button 
                className="primary" 
                type="button" 
                title="Escolher Foto" 
                onClick={() => fileInputRef.current?.click()}  
                />
            </form>
            

            </div>

            </div>

        </main>
    )
}