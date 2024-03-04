'use client'

import Logo from '@/app/assets/logoLectio.svg';
import LogoWithName from '@/app/assets/logoWithName.svg';
import AlertIcon from '@/app/assets/alertIcon.svg'
import ImageBookLover from '@/app/assets/imageBookLover.svg'

import Button from "@/app/components/Button/Button";
import Input from "@/app/components/input/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaSignIn, signinFormProps } from "@/app/schemas/schemaSignIn";

import './signin.css';

export default function SignIn() {
    const { handleSubmit, register, formState:{ errors } } = useForm<signinFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaSignIn)
    });    

    const handleData:SubmitHandler<signinFormProps> = (data) => {
        console.log('submit', data);
        console.log(errors)
    }

    return (
        <main className="signin-container">
            <header><img src={LogoWithName} alt="Logo Lectio and name" className='signin-logo-with-name'/></header>
            <section className='signin-content'>
                <section className='signin-left-side'>
                    <img src={ImageBookLover} alt="" className='signin-book-lover' />
                    <h4 className='signin-body-desktop'>Embarque na aventura de conhecer o melhor da literatura brasileira</h4>
                </section>
                
                <section className="signin-page">
                    <header>
                        <img className='signin-logo' src={Logo} alt="logo da plataforma Lectio" />
                    </header>

                    <h2 className='signin-title'>Faça seu Login</h2>
                    <h4 className='signin-body-mobile'>Embarque na aventura de conhecer o melhor da literatura brasileira</h4>

                    <form className="signin-form" onSubmit={handleSubmit(handleData)}>
                        <div>
                            <Input 
                                register={register('email', {required: 'campo obrigatório'})}  
                                errorMessage={errors.email && errors.email.message}
                                label="E-mail" placeholder="Digite seu endereço de e-mail" type="email" 
                            />

                            <Input 
                                register={register('password', {required: 'campo obrigatório'})}  
                                errorMessage={errors.password && errors.password.message} 
                                label="Senha" placeholder="Digite sua senha" type="password"
                            />
                        </div>

                        <span className='signin-forgot-password'>Esqueceu sua senha?</span>
                        
                        <Button title='Entrar' type='submit' size='full' className={!errors ? 'primary' : 'disabled'} disabled={!errors ? '' : 'disabled'}/>
                    </form>

                    <span className="signin-redirect">Não tem uma conta? <a href="./signup">Cadastrar-se</a></span>
                </section>
            </section>
            <section className="signin-footer">
                <span>Copyright 2022. Todos os direitos reservados</span>
            </section>
        </main>
    )
}