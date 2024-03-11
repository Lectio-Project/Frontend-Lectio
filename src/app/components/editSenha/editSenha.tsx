import './editSenha.css';
import Input from '../input/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { newPassProps, schemaNewPassword } from '@/app/schemas/schemaEdit';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button/Button';
import BackIcon from '../../assets/arrowBack.svg';
import CloseIcon from '../../assets/closeIcon.svg';
import { useDataContext } from '@/context/user';
import api from '@/api/api';
import { useState } from 'react';

export default function EditSenha(){

    const { userData,showModalEditPass, setShowModalEditPass } = useDataContext();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { handleSubmit,register, formState:{ errors } } = useForm<newPassProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaNewPassword)
    });

    const handleData:SubmitHandler<newPassProps> = async (data) => {
        try {
            if(data.password !== data.password){
                throw new Error('As senhas não são iguais!');
                return
            }

            await api.patch(`/users/${userData.id}`,{
                password: data.password
            },
            {
                headers: {
                authorization: `Bearer ${userData.token}` ,
                },
            }
            )
            
        } catch (error) {
            return  console.error(error);
        }

        setTimeout(() => {
        setShowModalEditPass(false)
        }, 300);
    }

    return(
        <main>
            <div className={`background-modal ${showModalEditPass ? 'open' : ''}`} onClick={() => setShowModalEditPass(false)}>

            <section className={`container-modal ${showModalEditPass ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                

                <div className='title-top'>
                    <span>Alterar senha</span>
                    <img src={CloseIcon} alt='Close icon' onClick={()=> setShowModalEditPass(false)}/>
                </div>

                <form onSubmit={handleSubmit(handleData)} className='forms-edit'>

                <Input 
                    register={register('password', {required: 'campo obrigatório'})}  
                    placeholder="digite a senha" 
                    type={showPassword ? 'text' : 'password'}
                    showPassword={showPassword} 
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                    label="Nova senha" 
                    errorMessage={errors.password && errors.password.message}
                    /> 
                    <p>Sua senha deve conter no mínimo  8 caracteres, um caractere especial, uma letra maiúscula e um número.</p>

                    <Input
                    register={register('passwordConfirmation', {required: 'campo obrigatório'})}  
                    placeholder="digite a senha" 
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    showPassword={showPasswordConfirmation} 
                    toggleShowPassword={() => setShowPasswordConfirmation(!showPasswordConfirmation)} 
                    label="Confirmar senha" 
                    errorMessage={errors.passwordConfirmation && errors.passwordConfirmation.message}
                    />

                    <Button className='primary' type='submit' title='Salvar alterações'/>

                </form>

            </section>
            </div>
        </main>
    )
}