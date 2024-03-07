'use client'
import './config-account.css';
import { useDataContext } from '@/context/user';
import BackIcon from '../../../assets/arrowBack.svg';
import GoIcon from '../../../assets/arrowGo.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { editFormProps, schemaEdit } from '@/app/schemas/schemaEdit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent, useEffect, useState } from 'react';
import EditSenha from '@/app/components/editSenha/editSenha';
import UploadImage from '@/app/components/modalUpload/modalUpload';
import api from '@/api/api';

export default function ConfigAccount(){
    const { 
        userData,
        setUserData,
        showModalEdit, 
        setShowModalEdit, 
        showModalImage, 
        setShowModalImage,
        selectedImageUrl
    } = useDataContext();
    
    const[errorValidate, setErrorValidate] = useState<string | null>(null);
    
    const { handleSubmit,register, formState:{ errors } } = useForm<editFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaEdit),
        defaultValues: {
            name: userData.name,
            userName: userData.userName,
            bio: userData.bio
        }
    });


    const handleData:SubmitHandler<editFormProps> = async (data) => {
        try {
            if(!data.name || !data.userName){
                throw new Error('O nome ou username não pode ser vazio');
                return
            }

            if(errorValidate !== ''){
                return setErrorValidate('');
            }

            const response = await api.patch(`/users/${userData.id}`,{
                name: data.name,
                username: '@' + data.userName,
                bio: data.bio,
            },
            {
                headers: {
                authorization: `Bearer ${userData.token}` ,
                },
            }
            )
        } catch (error: any) {
            

            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message;
                
                

                return setErrorValidate(errorMessage);
            }

            console.log(error.message)
        }
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(handleData)();
        }
    };

    useEffect(()=>{
        setUserData(userData=>({...userData, imageUrl: selectedImageUrl}));
    }, [showModalImage])

    const initialImage = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'

    return(
        <main className='container-edit'>

            <div className='back-section'>
            <img src={BackIcon} alt='backIcon'/>
            <p>Voltar</p>
            </div>

            <section className='image-profile'>

                <img src= {userData.imageUrl || initialImage} alt='Profile image'/>
                <p onClick={()=>setShowModalImage(true)}>Definir foto de perfil</p>
            </section>

            {errorValidate && <span>{errorValidate}</span>}

            <form className='form-edit' onSubmit={handleSubmit(handleData)}>

                <div>
                    <div className='edit-area'>
                    <label>Nome</label>
                    <input 
                    {...register('name', {required: 'campo obrigatório'})}  
                    placeholder="Digite seu nome" 
                    type="text" 
                    autoComplete="off"
                    onKeyDown={handleKeyPress}
                    />
                    <p>{errors.name && errors.name.message}</p>
                    </div>

                    <div className='edit-area'>
                    <label>Username</label>
                    <input 
                    {...register('userName', {required: 'campo obrigatório'})}  
                    placeholder="Digite seu username" 
                    type="text" 
                    autoComplete="off"
                    onKeyDown={handleKeyPress}
                    />
                    <p>{errors.userName && errors.userName.message}</p>
                    </div>

                    <div className='bio-area'>
                    <label>Bio</label>
                    <textarea
                    {...register('bio')}  
                    placeholder="Digite sua bio"
                    maxLength={180}
                    rows={4}
                    autoComplete="off"
                    />
                    <p>{errors.bio && errors.bio.message}</p>
                    </div>

                </div>

                <div className='secure-option' onClick={()=> setShowModalEdit(true)}>
                    <p>Senha e segurança</p>
                    <img src={GoIcon} alt='Intro Icon'/>
                </div>
            

            </form>

            {showModalEdit && <EditSenha/>}

            {showModalImage && <UploadImage/>}

        </main>
    )
}