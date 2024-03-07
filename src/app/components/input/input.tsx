'use client';

import { Input } from '@/types/forms-type';
import { UseFormRegisterReturn } from 'react-hook-form';

import AlertIcon from '@/app/assets/alertIcon.svg'
import ShowPassword from '@/app/assets/showPassword.svg';
import HidePassword from '@/app/assets/hidePassword.svg';

import './input.css'

interface propsRegister {
    register?: UseFormRegisterReturn<string>,
    label?: string,
    placeholder?: string,
    value ?: string,
    type?: string
    errorMessage?: string
    showPassword?: boolean,
    toggleShowPassword?: () => void,
}

export default function Input({ label, placeholder, register, value, type, errorMessage, showPassword, toggleShowPassword}:propsRegister){

    return(
        <div className={`input ${errorMessage && 'input-error'} ${register?.name === 'password' && 'input-password'}`}>
            <label>{label}</label>
            <div className='container-input'>
                <input
                    placeholder={placeholder}
                    value={value}
                    type={type}
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