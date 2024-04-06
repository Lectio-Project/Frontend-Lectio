'use client';

import ImageBookLover from '@/app/assets/imageBookLover.svg';
import Logo from '@/app/assets/logoLectio.svg';
import LogoWithName from '@/app/assets/logoWithName.svg';

import api from '@/api/api';
import Button from '@/app/components/Button/Button';
import Input from '@/app/components/input/input';

import { schemaSignIn, signinFormProps } from '@/app/schemas/schemaSignIn';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { setCookie } from '@/utils/cookies';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDataContext } from '@/context/user';
import { signIn } from 'next-auth/react';
import './signin.css';

export default function SignIn() {
    const [responseError, setResponseError] = useState({});
    const { setUserData } = useDataContext();
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<signinFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaSignIn)
    });

    const handleData: SubmitHandler<signinFormProps> = async (data) => {
        const { email, password } = data;

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            setResponseError('As credenciais do usuário são inválidas');
          }
          
        try {            
            const response = await api.post('/users/sign-in', {email, password});
            
            if (response.status === 200) {
                await setCookie('token', response.data.token);
                setUserData(response.data);
                setResponseError({});
                console.log(response.data);

                redirect('/home');
            }
        } catch (error: any) {
            return setResponseError(error.response.data.message);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="signin-container">
            <header>
                <img
                    src={LogoWithName}
                    alt="Logo Lectio and name"
                    className="signin-logo-with-name"
                />
            </header>
            <section className="signin-content">
                <section className="signin-left-side">
                    <img
                        src={ImageBookLover}
                        alt=""
                        className="signin-book-lover"
                    />
                    <h4 className="signin-body-desktop">
                        Embarque na aventura de conhecer o melhor da literatura
                        brasileira
                    </h4>
                </section>

                <section className="signin-page">
                    <header>
                        <img
                            className="signin-logo"
                            src={Logo}
                            alt="logo da plataforma Lectio"
                        />
                    </header>

                    <h2 className="signin-title">Faça seu Login</h2>
                    <h4 className="signin-body-mobile">
                        Embarque na aventura de conhecer o melhor da literatura
                        brasileira
                    </h4>

                    <form
                        className="signin-form"
                        onSubmit={handleSubmit(handleData)}
                    >
                        <div>
                            <Input
                                register={register('email')}
                                errorMessage={
                                    errors.email && errors.email.message
                                }
                                label="E-mail"
                                placeholder="Digite seu endereço de e-mail"
                                type="email"
                            />

                            <Input
                                register={register('password')}
                                errorMessage={
                                    errors.password && errors.password.message
                                }
                                label="Senha"
                                placeholder="Digite sua senha"
                                type={showPassword ? 'text' : 'password'}
                                showPassword={showPassword}
                                toggleShowPassword={() =>
                                    setShowPassword(!showPassword)
                                }
                            />
                        </div>
                        {Object.keys(responseError).length > 0 && (
                            <span className="signin-response-error">
                                {Object(responseError)}
                            </span>
                        )}

                        <span className="signin-forgot-password">
                            Esqueceu sua senha?
                        </span>

                        <Button
                            title="Entrar"
                            type="submit"
                            className={
                                Object.keys(errors).length > 0
                                    ? 'disabled'
                                    : 'active'
                            }
                            disabled={
                                Object.keys(errors).length > 0 ? 'disabled' : ''
                            }
                        />
                    </form>

                    <span className="signin-redirect">
                        Não tem uma conta? <a href="./signup">Cadastrar-se</a>
                    </span>
                </section>
            </section>

            <section className="signin-footer">
                <span>Copyright 2022. Todos os direitos reservados</span>
            </section>
        </main>
    );
}
