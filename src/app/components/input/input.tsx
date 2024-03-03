import { Input } from '@/types/forms-type';
import { UseFormRegisterReturn } from 'react-hook-form';
import AlertIcon from '@/app/assets/alertIcon.svg'

import './input.css'

interface propsRegister {
    register?: UseFormRegisterReturn<string>,
    label?: string,
    placeholder?: string,
    value ?: string,
    type?: string
    errorMessage?: string
}

export default function Input({label,placeholder,register,value, type, errorMessage}:propsRegister){
    return(
        <div className={`input ${errorMessage && 'input-error'}`}>
            <label> {label} </label>
            <input
            placeholder={placeholder}
            value={value}
            type={type}
            {...register}
            />
            {errorMessage && (
                <div className='error-container'>
                    <img src={AlertIcon} className='alert-icon'/>
                    <p className='error-message-input'>{errorMessage}</p>
                </div>
            )}
        </div>
    )
}