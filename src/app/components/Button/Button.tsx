import { button } from "@/types/forms-type";
import './Button.css';

export default function Button({title, type, className, size, disabled}: button) {
    return (
        <button 
            className={className === 'primary' ? 'primary' : 'secondary'} 
            style={size === 'full' ? {width: '100%'} : {width: '50%'}} 
            type={type}
            disabled={disabled ? true : false}
        >
            {title}
        </button>
    )
}