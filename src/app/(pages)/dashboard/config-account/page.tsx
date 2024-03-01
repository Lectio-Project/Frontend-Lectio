'use client'
import './config-account.css';
import { useDataContext } from '@/context/user';
import Input from '@/app/components/input/input';
import Logo from '../../../assets/logoLectio.svg';
import BackIcon from '../../../assets/arrowBack.svg';
import GoIcon from '../../../assets/arrowGo.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { editFormProps, schemaEdit } from '@/app/schemas/schemaEdit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent } from 'react';

export default function ConfigAccount(){
    const { userData } = useDataContext();

    const { handleSubmit,register, formState:{ errors } } = useForm<editFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaEdit),
        defaultValues: {
            name: userData.name,
            userName: userData.userName,
            bio: userData.bio
        }
    });

    const handleData:SubmitHandler<editFormProps> = (data) => {
        console.log('submit', data);
        console.log(errors)
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(handleData)();
        }
    };

    return(
        <main className='container-edit'>

            <div className='back-section'>
            <img src={BackIcon} alt='backIcon'/>
            <p>Voltar</p>
            </div>

            <section className='image-profile'>

                <img src= {Logo} alt='Profile image'/>
                <p>Definir foto de perfil</p>
            </section>

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

                <div className='secure-option'>
                    <p>Senha e segurança</p>
                    <img src={GoIcon} alt='Intro Icon'/>
                </div>
            

            </form>

        </main>
    )
}