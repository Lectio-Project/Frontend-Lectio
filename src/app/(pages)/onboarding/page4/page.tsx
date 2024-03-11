'use client'

import Button from '@/app/components/Button/Button';
import BooksOnboarding from '@/app/components/BooksOnboarding/BooksOnboarding';
import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';

import './page4.css';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

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