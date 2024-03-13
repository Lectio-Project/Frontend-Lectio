import Button from '@/app/components/Button/Button';

import './FooterOnboarding.css';

export default function FooterOnboarding() {
    return (
        <footer className='onboarding-footer-button-action'>
                <Button className='secondary' title='Pular' type='button' />
                <Button className='primary' title='Continuar' type='submit'/>
        </footer>
    )
}