'use client'

import { Genre } from '@/types/onboarding-types';
import { useState } from 'react';

import Header from '@/app/components/Header/Header';
import GenresOnboarding from '@/app/components/GenresOnboarding/GenresOnboarding';

import './search.css';

export default function Seacrh() {
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    return (
        <main className='container-search'>
            <Header search='able' select='none'/>

            <h3 className='title-search'>Filtre por gênero</h3>
            <section className='container-genres-options'>
                <GenresOnboarding selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} page='search'/>
            </section>
        </main>
    )
}