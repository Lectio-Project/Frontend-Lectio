import Button from "../Button/Button";

import CloseIcon from '../../assets/closeIcon.svg';

import Loading from '@/app/components/Loading/loading'

import { useRef, useState } from "react";
import { useDataContext } from "@/context/user";
import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";
import { storage } from "./fireBase";

import api from "@/api/api";
import './modalUpload.css';
import { getCookie } from "@/utils/cookies";


export default function UploadImage(){
    const { userData,
        setUserData,
        setShowModalImage,
        selectedImageUrl,
        setSelectedImageUrl,
        } = useDataContext();

    const[imgUrl, setImgUrl] = useState('');
    const [progressUp, setProgressUp] = useState(0);
    const [ removeLoad, setRemoveLoad] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null)
    

    async function handleUpload(event: any) {
        event.preventDefault();
    
        const file = event.target.files[0];
    
        if (!file) {
            return console.log('file vazio');
        }
    
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressUp(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setImgUrl(url);
                        
    
                        
                        if (url) {
                            setRemoveLoad(false);
                            getCookie('token').then(async (token) => {

                                const response = await api.patch(`/users`, {
                                    imageUrl: url
                                }, {
                                    headers: {
                                        authorization: `Bearer ${token}`,
                                    },
                                });
    
                                setUserData((userData) => ({
                                    ...userData,
                                    imageUrl: url
                                }));
                                
                                
                                setSelectedImageUrl(url);
                                setRemoveLoad(true);
                                
    
                                if (response.status === 200) {
                                    setShowModalImage(false);
                                    return
                                }
                            }).catch((error) => {
                                console.log(error.message);
                                setRemoveLoad(true)
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        );
    }    
        const initialImage = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'

    return(
        <main>
            <div className="background-modal-img">

            <div className='container-upload'>

            {removeLoad &&
            <div className={`edit-step ${removeLoad==true ? 'show' : 'hide'}`}>
            <div className='close-area' >
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
            }
            {!removeLoad &&
            <div className={`load-state ${removeLoad==false ? 'hide': 'show'}`}>
                <span className="text-load">Alterar foto</span>
                <Loading/>
            </div>
            }

            </div>



            </div>

        </main>
    )
}