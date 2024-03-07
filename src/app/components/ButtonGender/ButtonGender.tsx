import { buttonGender } from '@/types/onboarding-types';

import './ButtonGender.css';

export default function ButtonGender({title, className, onClick}: buttonGender) {
    return (
        <button type='button' className={className} onClick={onClick}>{title}</button>
    )
}