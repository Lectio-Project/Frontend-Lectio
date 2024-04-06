'use client'
import './profile.css';
import { useDataContext } from '@/context/user';

import Logo from '../../../assets/logoWithName.svg';
import GoIconY from '../../../assets/arrowGoYellow.svg';
import MenuIcon from '../../../assets/menuIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';

import { zodResolver } from '@hookform/resolvers/zod';
import { editFormProps, schemaEdit } from '@/app/schemas/schemaEdit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import EditSenha from '@/app/components/editSenha/editSenha';
import UploadImage from '@/app/components/modalUpload/modalUpload';
import HamburguerMenu from '@/app/components/hamburguerMenu/hamburguerMenu';
import api from '@/api/api';
import NavBar from '@/app/components/NavBar/navBar';
import Header from '@/app/components/Header/Header';
import { useSession } from 'next-auth/react';

export default function Profile(){
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
    
    const router= useRouter();
    const session = useSession();
    
    const[errorValidate, setErrorValidate] = useState<string | null>(null);
    
    const { handleSubmit,register, formState:{ errors } } = useForm<editFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaEdit),
        defaultValues: {
            name: session.data?.name,
            userName: session.data?.username,
            bio: session.data?.bio
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

            const response = await api.patch(`/users/${session.data!.id}`,{
                name: data.name,
                username: '@' + data.userName,
                bio: data.bio,
            },
            {
                headers: {
                authorization: `Bearer ${session.data!.token}` ,
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
            handleSubmit(handleData);
        }
    };

    useEffect(()=>{
        setUserData(userData=>({...userData, imageUrl: selectedImageUrl}));
    }, [showModalImage])


    const initialImage = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'

    interface ImageErrorEvent extends SyntheticEvent<HTMLImageElement, Event> {
        target: EventTarget & {
            src: string;
        };
    }

    function handleImageError(event: ImageErrorEvent) {
        event.target.src = initialImage;
    }

    return(
        <main className='container-edit'>

            <Header search='disabled' select='perfil' />
            
            <section className='area-profile'>

                <img src= {session.data?.imageUrl || initialImage} alt='Profile image' onError={handleImageError}/>

                <div className='info-profile'>
                <span>{session.data?.name ? session.data?.name : 'Nome do usuário' }</span>
                <p>{session.data?.username ? session.data?.username : 'UserName'}</p>
                </div>
                
            </section>

            {errorValidate && <span>{errorValidate}</span>}

            <section className='form-edit' onSubmit={handleSubmit(handleData)}>

                    <div className='label-area'>
                        <span>Bio</span>
                        <img src={EditIcon} alt= 'Edit Icon' onClick={() => router.push('/profile/edit')}/>
                    </div>

                    <div className='bio-area'>

                    <textarea
                    {...register('bio')}  
                    placeholder="Sem biografia"
                    maxLength={180}
                    rows={4}
                    disabled
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