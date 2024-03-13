'use client'

import BooksOnboarding from '@/app/components/BooksOnboarding/BooksOnboarding';
import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

import '@/app/styles/OnboardingSteps.css';

export default function Page4() {
    return (
        <main className='onboarding-steps-container'>
            <HeaderOnboarding title='títulos' />

            <section className='onboarding-steps-options'>
                <BooksOnboarding />
            </section>
            <FooterOnboarding />
        </main>
    )
}