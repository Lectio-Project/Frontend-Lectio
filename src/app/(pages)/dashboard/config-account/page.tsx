'use client'
import './config-account.css';
import { useDataContext } from '@/context/user';
import Logo from '../../../assets/logoWithName.svg';
import GoIconY from '../../../assets/arrowGoYellow.svg';
import MenuIcon from '../../../assets/menuIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { editFormProps, schemaEdit } from '@/app/schemas/schemaEdit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent, useEffect, useState } from 'react';
import EditSenha from '@/app/components/editSenha/editSenha';
import UploadImage from '@/app/components/modalUpload/modalUpload';
import HamburguerMenu from '@/app/components/hamburguerMenu/hamburguerMenu';
import api from '@/api/api';

export default function ConfigAccount(){
    const { 
        userData,
        setUserData,
        showModalEditPass, 
        setShowModalEditPass, 
        showModalImage, 
        setShowModalImage,
        selectedImageUrl,
        openDrawer, 
        setOpenDrawer
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

            <header className='header-container'>

            <div className='logo-section'>
            <img src={Logo} alt='logo Icon'/>
            </div>

            <div className='sandwich-menu' onClick={()=> setOpenDrawer(true)}>
                <img src={MenuIcon} alt='sandwich menu' />
            </div>

            </header>

            
            <HamburguerMenu select= 'perfil'/>
            

            <section className='area-profile'>

                <img src= {userData.imageUrl || initialImage} alt='Profile image'/>

                <div className='info-profile'>
                <span>{userData.name ? userData.name : 'Nome do usuário' }</span>
                <p>{userData.userName ? userData.userName : 'UserName'}</p>
                </div>
                
            </section>

            {errorValidate && <span>{errorValidate}</span>}

            <section className='form-edit' onSubmit={handleSubmit(handleData)}>

                    <div className='label-area'>
                        <span>Bio</span>
                        <img src={EditIcon} alt= 'Edit Icon'/>
                    </div>

                    <div className='bio-area'>

                    <textarea
                    {...register('bio')}  
                    placeholder="Digite sua bio"
                    maxLength={180}
                    rows={4}
                    autoComplete="off"
                    />

                    <p>{errors.bio && errors.bio.message}</p>
                    </div>


                <div className='secure-option' onClick={()=>setShowModalEditPass(true)}>
                    <p>Alterar senha</p>
                    <img src={GoIconY} alt='Intro Icon'/>
                </div>
            

            </section>

            

            <EditSenha/>

            {showModalImage && <UploadImage/>}
            
            

        </main>
    )
}