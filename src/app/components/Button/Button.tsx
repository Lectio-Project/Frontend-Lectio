import { button } from "@/types/forms-type";
import './Button.css';

export default function Button({title, type, className, onClick}: button) {
    return (
        <button className={className === 'primary' ? 'primary' : 'secondary'} type={type} onClick={onClick}>{title}</button>
    )
}