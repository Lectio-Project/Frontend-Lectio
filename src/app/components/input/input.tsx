<<<<<<< HEAD
import { FiEye, FiEyeOff } from 'react-icons/fi';
=======
'use client';
>>>>>>> b309aff8f2e44732b7dd55de6b1afbfc0d7a4003

import { Input } from '@/types/forms-type';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';
<<<<<<< HEAD
=======

import AlertIcon from '@/app/assets/alertIcon.svg'
import ShowPassword from '@/app/assets/showPassword.svg';
import HidePassword from '@/app/assets/hidePassword.svg';
import ShowPasswordFocused from '@/app/assets/showPasswordFocused.svg';
import HidePasswordFocused from '@/app/assets/hidePasswordFocused.svg';
>>>>>>> b309aff8f2e44732b7dd55de6b1afbfc0d7a4003

import './Input.css';

interface propsRegister {
    register?: UseFormRegisterReturn<string>,
    label?: string,
    placeholder?: string,
    value ?: string,
    security ?: boolean,
    type?: string
    errorMessage?: string,
    showPassword?: boolean,
    toggleShowPassword?: () => void,
}

<<<<<<< HEAD
export default function Input({label,placeholder,register,value, security, type, errorMessage}:propsRegister){    
     const [viewInput, setViewInput] = useState(false);

    function handleViewChange() {
        setViewInput(!viewInput);
    }

    return(
        <div className='input'>
            <label> {label} </label>
            <div className='security-password'>
                <input  
                placeholder={placeholder}
                value={value}
                type={security ? (viewInput ? 'text' : 'password') : type}
                {...register}
                />

                {security && (
                    viewInput ? 
                        <FiEye size={'1.5rem'} onClick={handleViewChange} title='Botão para esconder a senha' /> 
                        : 
                        <FiEyeOff size={'1.5rem'} onClick={handleViewChange} title='Botão para visualizar a senha' />
                )}

            </div>
            <p>{errorMessage}</p>
=======
export default function Input({ label, placeholder, register, value, type, errorMessage, showPassword, toggleShowPassword}:propsRegister){
    const [isFocused, setIsFocused] = useState(false);
>>>>>>> b309aff8f2e44732b7dd55de6b1afbfc0d7a4003

    return(
        <div className={`input ${errorMessage && 'input-error'} ${register?.name === 'password' && 'input-password'}`}>
            <label>{label}</label>
            <div className='container-input'>
                <input
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...register}
                />
                {(register?.name === 'password' || register?.name === 'passwordConfirmation') &&  (
                    <img
                        src={showPassword ? HidePassword : ShowPassword}
                        alt="Eye to show or hide password"
                        onClick={toggleShowPassword}
                    />
                )}
            </div>
            {errorMessage && (
                <div className='error-container'>
                    <img src={AlertIcon} className='alert-icon'/>
                    <p className='error-message-input'>{errorMessage}</p>
                </div>
            )}
        </div>
    )
}