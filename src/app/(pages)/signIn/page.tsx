'use client'

import logo from '@/app/assets/logoLectio.svg';

import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaSignIn, signinFormProps } from "@/app/schemas/schemaSignIn";
import { useState } from 'react';

import './signin.css';

export default function SignIn() {
    const [notFilledInputs, setNoFilledInputs] = useState(false);

    const { handleSubmit, register, formState:{ errors } } = useForm<signinFormProps>({
        mode: 'onChange',
        resolver: zodResolver(schemaSignIn)
    });    

    const handleData:SubmitHandler<signinFormProps> = (data) => {
        console.log('submit', data);
        console.log(errors)
    }

    return (
        <main className="signin-page">
                <img src={logo} alt="logo da plataforma Lectio" />

                <h2>Faça seu Login</h2>
                <p className='signin-p'>Embarque na aventura de conhecer o melhor da literatura brasileira</p>

                <form className="signin-form" onSubmit={handleSubmit(handleData)}>
                    <div>
                        <Input 
                            register={register('email', {required: 'campo obrigatório'})}  
                            errorMessage={errors.email && errors.email.message}
                            label="E-mail" placeholder="Digite seu endereço de e-mail" type="email" 
                            security={false}
                        />

                        <Input 
                            register={register('password', {required: 'campo obrigatório'})}  
                            errorMessage={errors.password && errors.password.message} 
                            label="Senha" placeholder="Digite sua senha" type="password"
                            security={true}
                        />
                    </div>

                    <span>Esqueceu sua senha?</span>
                    
                    <div className='signin-button'>
                        <Button className="primary" title="Entrar" type="submit" size='full' disabled={notFilledInputs} />
                    </div>
                </form>

                <span className="signin-redirect">Não tem uma conta? <a href="./signUp">Cadastrar-se</a></span>
            
                <section className="signin-footer">
                    <span>Copyright 2022. Todos os direitos reservados</span>
                </section>
        </main>
    )
}