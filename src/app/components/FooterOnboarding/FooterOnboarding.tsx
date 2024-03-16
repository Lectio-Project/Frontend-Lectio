import { useRouter } from 'next/navigation';
import { FooterOnboarding } from '@/types/onboarding-types';

import Button from '@/app/components/Button/Button';

import './FooterOnboarding.css';

export default function FooterOnboarding({ selectedItems = [], page }: FooterOnboarding) {
    const router = useRouter();

    return (
        <footer className='onboarding-footer-button-action'>
                <Button className='secondary' title='Pular' type='button' onClick={() => router.push(page)} disabled={selectedItems.length === 3}/>
                <Button className='continue-btn' title='Continuar' type='submit' onClick={() => router.push(page)} disabled={selectedItems.length < 3}/>
        </footer>
    )
}