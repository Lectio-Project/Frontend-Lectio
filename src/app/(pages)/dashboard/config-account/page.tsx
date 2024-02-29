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

    return(
        <main>
            <div className='back-section'>
            <img src={BackIcon} alt='backIcon'/>
            <p>Voltar</p>
            </div>

            <section>
                <img src= {Logo} alt='Profile image'/>
                <p>Definir foto de perfil</p>
            </section>

            <section>
                <div>
                    <Input 
                    register={register('name', {required: 'campo obrigatório'})}  
                    placeholder="Digite seu nome" 
                    type="text" 
                    label="Nome" 
                    errorMessage={errors.name && errors.name.message}
                    />

                    <Input 
                    register={register('userName', {required: 'campo obrigatório'})}  
                    placeholder="Digite seu nome de usuário" 
                    type="text" 
                    label="Username" 
                    errorMessage={errors.userName && errors.userName.message}
                    />

                    <Input 
                    register={register('bio')}  
                    placeholder="Digite sua bio" 
                    type="text" 
                    label="Bio" 
                    errorMessage={errors.name && errors.name.message}
                    />
                    <div>
                        <p>Senha e segurança</p>
                        <img src={GoIcon} alt='Intro Icon'/>
                    </div>

                </div>
            

            </section>

        </main>
    )
}