'use client'

import facebook from '@/app/assets/facebook.svg';
import instagram from '@/app/assets/instagram.svg';
import whatsapp from '@/app/assets/whatsapp.svg';

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
        <main>
            <div className="signin-page">
                <h2>Faça seu Login</h2>
                <p>Embarque na aventura de conhecer o melhor da literatura brasileira</p>

                <form className="signin-form" onSubmit={handleSubmit(handleData)}>
                    <div>
                        <Input 
                            register={register('email', {required: 'campo obrigatório'})}  
                            errorMessage={errors.email && errors.email.message}
                            label="E-mail" placeholder="Digite seu e-mail" type="email" 
                        />

                        <Input 
                            register={register('password', {required: 'campo obrigatório'})}  
                            errorMessage={errors.password && errors.password.message} 
                            label="Senha" placeholder="Digite sua senha" type="password"
                        />
                    </div>

                    <span>Esqueceu a senha?</span>
                    <Button className="primary" title="Entrar" type="submit" />
                </form>

                <span className="signin-redirect">Não tem login? <a href="./signUp">Cadastre-se</a></span>
                
                <div id="banner" />

                <section className="signin-footer">
                    <span>Copyright 2022. Todos os direitos reservados</span>

                    <article>
                        <img src={facebook} alt="logo do facebook" />
                        <img src={instagram} alt="logo do instagram" />
                        <img src={whatsapp} alt="logo do whatsapp" />
                    </article>
                </section>
            </div>
        </main>
    )
}