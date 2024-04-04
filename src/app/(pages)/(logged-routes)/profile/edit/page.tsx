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

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { editFormProps, schemaEdit } from '@/app/schemas/schemaEdit';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import UploadImage from '@/app/components/modalUpload/modalUpload';


export default function EditPage(){
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
            name: userData.name,
            userName: userData.username,
            bio: userData.bio
        }
    });

    const route= useRouter();
    const[errorValidate, setErrorValidate] = useState<string | null>(null);
    
    const handleData: SubmitHandler<editFormProps> = async (data) => {
        try {
            const token = await getCookie('token');
            console.log(token);
            
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
                authorization: `Bearer ${token}` ,
                },
            }
            )

            if(response.data.status === '200'){
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

            <nav>
                <NavBar select='perfil'/>
            </nav>

        </header>


        <HamburguerMenu select= 'perfil'/>

        <section className='image-area'>
            <h3>Editar perfil</h3>
            <img src= {userData.imageUrl || initialImage} alt='Profile image'/>
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