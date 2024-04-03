import { button } from "@/types/forms-type";
import './Button.css';

export default function Button({title, type, className, onClick, disabled}: button) {
    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>{title}</button>
    )
}