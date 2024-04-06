'use client'
import { useDataContext } from '@/context/user';

import Logo from '../../../../assets/logoWithName.svg';
import GoIconY from '../../../../assets/arrowGoYellow.svg';
import MenuIcon from '../../../../assets/menuIcon.svg';
import EditIcon from '../../../../assets/editIcon.svg';

import NavBar from '@/app/components/NavBar/navBar';
import HamburguerMenu from '@/app/components/hamburguerMenu/hamburguerMenu';
import Input from "@/app/components/input/input";
import Button from '@/app/components/Button/Button';
import './edit.css';

import api from '@/api/api';

import { SyntheticEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { editFormProps, schemaEdit } from '@/app/schemas/schemaEdit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import UploadImage from '@/app/components/modalUpload/modalUpload';
import Header from '@/app/components/Header/Header';
import { useSession } from 'next-auth/react';


export default function EditPage(){
    const {data: session, update} = useSession();

    const { 
        userData,
        setUserData,
        showModalImage, 
        setShowModalImage,
        selectedImageUrl,
        openDrawer, 
        setOpenDrawer
    } = useDataContext();

    const { handleSubmit,register, formState:{ errors } } = useForm<editFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaEdit),
        defaultValues: {
            name: session?.name,
            userName: session?.username,
            bio: session?.bio
        }
    });

    const route= useRouter();
    
    const[errorValidate, setErrorValidate] = useState<string | null>(null);
    
    const handleData: SubmitHandler<editFormProps> = async (data) => {
        try {
            if(!data.name || !data.userName){
                throw new Error('O nome ou username não pode ser vazio');
                return
            }

            if(errorValidate !== ''){
                return setErrorValidate('');
            }
            
            const response = await api.patch(`/users`,{
                name: data.name,
                username: '@' + data.userName,
                bio: data.bio,
            },
            {
                headers: {
                authorization: `Bearer ${session?.token}` ,
                },
            }
            )
            
            if(response.status === 204 || response.status === 200){
                setErrorValidate('')
                return route.push('/profile');
            }

        } catch (error: any) {
            

            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message;
                
                

                return setErrorValidate(errorMessage);
            }

            console.log(error.message)
        }
    }
    
    const updateUserSession = async () => {
        try {
            const response = await api.get('/users/profile', { 
                    headers: {
                    authorization: `Bearer ${session?.token}`,
                },
            })

            console.log(response);

            if (response.status === 200) {
                const userData = response.data
                console.log(userData);
                
                update({ ...userData })
                console.log(session);
            } else {
                console.error('Erro ao obter os dados do perfil do usuário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar a sessão:', error);
        }
      };

    useEffect(()=>{
        // updateUserSession();
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
        <Header search='disabled' select='perfil'/>

        <section className='image-area'>
            <h3>Editar perfil</h3>
            <img src= {session?.imageUrl || initialImage} alt='Profile image' onError={handleImageError}/>
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

        { showModalImage && <UploadImage/>}

        </main>
    )
}