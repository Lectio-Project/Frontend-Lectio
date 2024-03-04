import './editSenha.css';
import Input from '../input/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { newPassProps, schemaNewPassword } from '@/app/schemas/schemaEdit';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button/Button';
import BackIcon from '../../assets/arrowBack.svg';
import { useDataContext } from '@/context/user';

export default function EditSenha(){

    const { userData, showModalEdit, setShowModalEdit } = useDataContext();

    const { handleSubmit,register, formState:{ errors } } = useForm<newPassProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaNewPassword)
    });

    const handleData:SubmitHandler<newPassProps> = (data) => {
        console.log('submit', data);
        console.log(errors)


        setShowModalEdit(false)
    }

    return(
        <main>
            <div className='background-modal'>

            <div className='back-area' onClick={()=> setShowModalEdit(false)}>
                <img src={BackIcon} alt='icon back'/>
                <span>Voltar</span>
                </div>

            <section className='container-modal'>
                

                <div className='title-top'>
                    <span>Senha e segurança</span>
                </div>

                <form onSubmit={handleSubmit(handleData)} className='forms-edit'>

                <Input 
                    register={register('password', {required: 'campo obrigatório'})}  
                    placeholder="digite a senha" 
                    type="text" 
                    label="Nova senha" 
                    errorMessage={errors.password && errors.password.message}
                    /> 

                    <Input 
                    register={register('confirmPassword', {required: 'campo obrigatório'})}  
                    placeholder="digite a senha" 
                    type="text" 
                    label="Confirmar senha" 
                    errorMessage={errors.confirmPassword && errors.confirmPassword.message}
                    />

                    <Button className='primary' type='submit' title='Salvar alterações'/>

                </form>

            </section>
            </div>
        </main>
    )
}