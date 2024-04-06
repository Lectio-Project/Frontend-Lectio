'use client'

import { Book } from '@/types/onboarding-types';
import { useState } from 'react';

import BooksOnboarding from '@/app/components/BooksOnboarding/BooksOnboarding';
import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

import '@/app/styles/OnboardingSteps.css';

export default function Page4() {
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

    return (
        <main className='onboarding-steps-container'>
            <HeaderOnboarding title='títulos' step={3}/>

            <section className='onboarding-steps-options'>
                <BooksOnboarding selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks}/>
            </section>
            <FooterOnboarding selectedItems={selectedBooks} page='./validate' title='títulos'/>
        </main>
    )
}