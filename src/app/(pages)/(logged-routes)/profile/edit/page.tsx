'use client'

import { useDataContext } from '@/context/user';

import Input from "@/app/components/input/input";
import Button from '@/app/components/Button/Button';
import './edit.css';

import api from '@/api/api';

import { ChangeEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { editFormProps, schemaEdit } from '@/app/schemas/schemaEdit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import UploadImage from '@/app/components/modalUpload/modalUpload';
import Header from '@/app/components/Header/Header';
import { useSession } from 'next-auth/react';
import Loading from '@/app/components/Loading/loading';


export default function EditPage(){
    const {data: session, update} = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { 
        userData,
        setUserData,
        showModalImage, 
        setShowModalImage,
        selectedImageUrl,
    } = useDataContext();

    const { handleSubmit,register, formState:{ errors } } = useForm<editFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaEdit),
        defaultValues: {
            name: session?.name || userData.name,
            userName: session?.username || userData.username,
            bio: session?.bio || userData.bio,
        }
    });

    const route= useRouter();
    
    const[errorValidate, setErrorValidate] = useState<string | null>(null);
    
    const handleData: SubmitHandler<editFormProps> = async (data) => {
        try {
            setIsLoading(true);
            if(!data.name || !data.userName){
                throw new Error('O nome ou username não pode ser vazio');
                return
            }

            if(errorValidate !== ''){
                setErrorValidate('');
            }
            
            const response = await api.patch(`/users`,{
                name: data.name,
                username: data.userName,
                bio: data.bio,
            },
            {
                headers: {
                authorization: `Bearer ${session?.token}` ,
                },
            }
            )

            if(response.status === 204 || response.status === 200){
                update({name: data.name, username: data.userName, bio: data.bio})
                
                return route.push('/profile');
            }

        } catch (error: any) {
            if (error.response && error.response.status >= 400) {
                const errorMessage = error.response.data.message;

                return setErrorValidate(errorMessage);
            }
        } finally {
            setInterval(() => {
                setIsLoading(false);
            }, 1000)
        }
    }
    
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

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        let value = event.target.value;
        
        if (value.indexOf('@') === 0) {
          event.target.value = value;
        } else {
          event.target.value = `@${value}`;
        }
      };

    return(
    <main className='container-edit'>
        <Header search='disabled' select='perfil' />

        {!isLoading ? (
            <div className='container-edit-profile'>
                <section className='image-area'>
                    <h3>Editar perfil</h3>
                    <img src= {userData?.imageUrl || initialImage} alt='Profile image' onError={handleImageError}/>
                    <span onClick={()=>setShowModalImage(true)}>Alterar foto</span>
                </section>

                <form className='edit-form' onSubmit={handleSubmit(handleData)}>
                    <Input 
                    register={register('name',{required: 'campo obrigatório'})}
                    label='Nome'
                    placeholder='Digite seu nome'
                    type='text'
                    errorMessage={errors.name && errors.name.message }
                    />
                    <label htmlFor='bio'>Bio</label>

                    <textarea
                    
                    {...register('bio')} 
                    id='bio'
                    placeholder="Digite sua bio"
                    maxLength={180}
                    rows={4}
                    autoComplete="off"
                    />

                    <Input 
                    register={register('userName',{required: 'campo obrigatório'})}
                    label='Nome de usuário'
                    placeholder='Digite seu username'
                    type='text'
                    errorMessage={errors.userName && errors.userName.message }
                    onChange={handleInputChange}
                    />

                    <div className='buttons-area'>
                    <Button 
                    title='Cancelar' 
                    type='button' 
                    className='secondary'
                    onClick={()=>route.push('/profile')}
                    />

                    <Button 
                    title='Salvar alterações' 
                    type='submit' 
                    className= {Object.keys(errors).length > 0 ? 'disabled' : 'active'} 
                    disabled={Object.keys(errors).length > 0 ? 'disabled' : ''}
                    />

                    </div>

                </form>
                
            </div>
        ) : (
            <div className='edit-loading'>
                <Loading /> 
            </div>
        )}

        { showModalImage && <UploadImage/>}

        </main>
    )
}