'use client'

import './profile.css';
import { useDataContext } from '@/context/user';

import GoIconY from '../../../assets/arrowGoYellow.svg';
import EditIcon from '../../../assets/editIcon.svg';

import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import EditSenha from '@/app/components/editSenha/editSenha';
import UploadImage from '@/app/components/modalUpload/modalUpload';
import Header from '@/app/components/Header/Header';
import { useSession } from 'next-auth/react';

export default function Profile() {
    const { 
        setUserData,
        setShowModalEditPass, 
        showModalImage,
        selectedImageUrl,
    } = useDataContext();
    
    const router= useRouter();
    const {data: session, update} = useSession();

    useEffect(()=>{
        setUserData(userData=>({...userData, imageUrl: selectedImageUrl}));
        update({imageUrl: selectedImageUrl})
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

                <img src= {session?.imageUrl || initialImage} alt='Profile image' onError={handleImageError}/>

                <div className='info-profile'>
                <span>{session?.name ? session?.name : 'Nome do usuário' }</span>
                <p>{session?.username ? session?.username : 'UserName'}</p>
                </div>
                
            </section>

            <section className='form-edit'>
                <div className='label-area'>
                    <span>Bio</span>
                    <img src={EditIcon} alt= 'Edit Icon' onClick={() => router.push('/profile/edit')}/>
                </div>

                <div className='bio-area'>
                    <textarea
                        placeholder="Sem biografia"
                        maxLength={180}
                        value={session?.bio}
                        rows={4}
                        disabled
                    />
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