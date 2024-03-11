import LogoWithName from '@/app/assets/logoWithName.svg';

import { headerOnboarding } from '@/types/onboarding-types';

import './HeaderOnboarding.css';

export default function HeaderOnboarding({title}: headerOnboarding) {
    return (
        <header>
            <div><img src={LogoWithName} alt="Logo Lectio and name" className='onboarding-steps-logo-with-name'/></div>

            <div className='onboarding-steps'>
                <span>3/3</span>
            </div>

            <h2 className='onboarding-steps-title'>Escolha 3 {title} que você gosta</h2>
        </header>
    )
}