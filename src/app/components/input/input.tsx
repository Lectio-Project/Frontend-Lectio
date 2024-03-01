import { FiEye, FiEyeOff } from 'react-icons/fi';

import { Input } from '@/types/forms-type';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

import './Input.css';

interface propsRegister {
    register?: UseFormRegisterReturn<string>,
    label?: string,
    placeholder?: string,
    value ?: string,
    security ?: boolean,
    type?: string
    errorMessage?: string
}

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

        </div>
    )
}