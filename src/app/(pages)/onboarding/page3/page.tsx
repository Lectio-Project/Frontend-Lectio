'use client'

import { Author } from '@/types/onboarding-types';
import { useState } from 'react';

import AuthorOnboarding from '@/app/components/AuthorOnboarding/AuthorOnboarding';
import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

import '@/app/styles/OnboardingSteps.css';

export default function Page3() {
    const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);

    return (
        <main className='onboarding-steps-container'>
            <HeaderOnboarding title='autores' step={2}/>    

            <section className='onboarding-steps-options'>
                <AuthorOnboarding selectedAuthors={selectedAuthors} setSelectedAuthors={setSelectedAuthors}/>
            </section>

            <FooterOnboarding selectedItems={selectedAuthors} page='./page4'/>
        </main>
    )
}