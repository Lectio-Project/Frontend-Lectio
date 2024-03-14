'use client'

import AuthorOnboarding from '@/app/components/AuthorOnboarding/AuthorOnboarding';
import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

import '@/app/styles/OnboardingSteps.css';

export default function Page3() {
    return (
        <main className='onboarding-steps-container'>
            <HeaderOnboarding title='autores' step={2}/>    

            <section className='onboarding-steps-options'>
                <AuthorOnboarding />
            </section>

            <FooterOnboarding />
        </main>
    )
}