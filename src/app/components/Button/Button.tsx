import { button } from "@/types/forms-type";
import './Button.css';

export default function Button({title, type, className}: button) {
    return (
        <button className={className} type={type}>{title}</button>
    )
}