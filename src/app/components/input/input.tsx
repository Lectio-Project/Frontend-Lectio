import { Input } from '@/types/forms-type';
import { UseFormRegisterReturn } from 'react-hook-form';

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
        <div className='input'>
            <label> {label} </label>
            <input
            placeholder={placeholder}
            value={value}
            type={type}
            {...register}
            />
            <p>{errorMessage}</p>

        </div>
    )
}