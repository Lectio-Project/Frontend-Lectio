import { input } from '@/types/forms-type';
import { useForm } from 'react-hook-form';


export default function Input({
    type,
    placeholder,
    label,
    ...rest
}:input){


    return(
        <div>
            <input
            
            type={type}
            placeholder={placeholder}
            />

        </div>
    )
}