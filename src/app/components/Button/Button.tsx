import { button } from "@/types/forms-type";
import './Button.css';

export default function Button({title, type, className, size}: button) {
    return (
        <button 
            className={className}
            style={size === 'full' ? {width: '100%'} : {width: '50%'}} 
            type={type}
            disabled={className === "disabled"}
        >
            {title}
        </button>
    )
}