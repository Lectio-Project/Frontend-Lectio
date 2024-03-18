'use client'

import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';
import GenresOnboarding from '@/app/components/GenresOnboarding/GenresOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

import '@/app/styles/OnboardingSteps.css';

export default function Page2() {
    return (
        <main className='onboarding-steps-container'>
            <HeaderOnboarding title='gêneros' step={1}/>    

            <section className='onboarding-steps-options'>
                <GenresOnboarding />
            </section>

            <FooterOnboarding />
        </main>
    )
}