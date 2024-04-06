'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Genre } from '@/types/onboarding-types';
import { getCookie } from '@/utils/cookies';

import api from '@/api/api';

import './ModalGenresSelection.css';

export default function ModalGenresSelection() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const router = useRouter();

    useEffect(() => {
        listGenres();
    }, []);

    const listGenres = async () => {
        try {
            const token = await getCookie('token');
            
            const response = await api.get('/genres', 
                { headers: {
                    Authorization: `Bearer ${token}`
                }});
            setGenres(response.data);
        } catch (error: any) {
            console.error(error)
        }
    }
    return (
        <main className='container-genre-search-input'>
            <h3 className='title-modal-genre-selection'>Busque por gênero</h3>
            <section className='name-genres-search-input'>
                {genres.map((genre) => {
                    return (
                        <section className='genre-search-input' key={genre.id}>
                            <div
                                className='default-genre-search-input'
                                onClick={() => router.push(`/search/result/${genre.id}`)}
                            >
                                {genre.gender}
                            </div>
                        </section>
                    );
                })}
            </section>
        </main>
    )
}