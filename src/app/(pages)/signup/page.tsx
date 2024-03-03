'use client'

import Logo from '@/app/assets/logoLectio.svg';

import Button from "@/app/components/Button/Button";
import Input from "@/app/components/input/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaSignUp, signUpFormProps } from "@/app/schemas/schemaSignUp";

import './signup.css';

export default function SignUp() {
    const { handleSubmit, register, formState:{ errors } } = useForm<signUpFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaSignUp)
    });

    const handleData:SubmitHandler<signUpFormProps> = (data) => {
        console.log('submit', data);
    }

    return (
        <main className='signup-main'>
            <section className="signup-page">
                <img src={Logo} alt="Logo Lectio" className='signup-logo'/>
                <h2 className='signup-title'>Cadastre-se</h2>
                <h4 className='signup-body'>Embarque na aventura de conhecer o melhor da literatura brasileira</h4>

                <form className="signup-form" onSubmit={handleSubmit(handleData)}>
                    <Input 
                        register={register('name', {required: 'campo obrigatório'})}  
                        errorMessage={errors.name && errors.name.message}
                        label="E-mail" placeholder="Digite seu nome completo" type="text" 
                    />

                    <Input 
                        register={register('email', {required: 'campo obrigatório'})}  
                        errorMessage={errors.email && errors.email.message} 
                        label="Senha" placeholder="Digite seu endereço de e-mail" type="email"
                    />

                    <Input 
                        register={register('password', {required: 'campo obrigatório'})}  
                        errorMessage={errors.password && errors.password.message} 
                        label="Senha" placeholder="Digite sua senha" type="password"
                    />
                    
                    <Input 
                        register={register('passwordConfirmation', {required: 'campo obrigatório'})}  
                        errorMessage={errors.passwordConfirmation && errors.passwordConfirmation.message} 
                        label="Confirmar Senha" placeholder="Digite sua senha novamente" type="password"
                    />
                    <label className='signup-checkbox'>
                        <input type='checkbox' defaultChecked={false}/>
                        Concordo em fornecer meus dados para a criação desta conta e declaro que li e aceito os termos e condições
                    </label>

                    <Button title='Cadastrar' type='submit' className={!errors ? 'active' : 'disabled'} disabled={!errors ? '' : 'disabled'}/>
                </form>

                <span className="signup-redirect">Já tem uma conta?<a href="./signIn">Faca seu login</a></span>

                <section className="signup-footer">
                    <span>Copyright 2022. Todos os direitos reservados.</span>
                </section>
            </section>
        </main>
    )
}