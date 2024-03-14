'use client'

import ButtonsOnboarding from '@/app/components/ButtonsOnboarding/ButtonsOnboarding';
import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

import '@/app/styles/OnboardingSteps.css';

export default function Page2() {
    return (
        <main className='onboarding-steps-container'>
            <HeaderOnboarding title='gêneros' step={1}/>    

            <section className='onboarding-steps-options'>
                <ButtonsOnboarding />
            </section>

            <FooterOnboarding />
        </main>
    )
}