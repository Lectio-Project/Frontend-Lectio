'use client'

import { Genre } from '@/types/onboarding-types';
import { useState } from 'react';

import HeaderOnboarding from '@/app/components/HeaderOnboarding/HeaderOnboarding';
import GenresOnboarding from '@/app/components/GenresOnboarding/GenresOnboarding';
import FooterOnboarding from '@/app/components/FooterOnboarding/FooterOnboarding';

import '@/app/styles/OnboardingSteps.css';

export default function Page2() {
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    return (
        <main className='onboarding-steps-container'>
            <HeaderOnboarding title='gêneros' step={1}/>    

            <section className='onboarding-steps-options'>
                <GenresOnboarding selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} page='onboarding'/>
            </section>

            <FooterOnboarding selectedItems={selectedGenres} page='./page3' title='gêneros'/>
        </main>
    )
}