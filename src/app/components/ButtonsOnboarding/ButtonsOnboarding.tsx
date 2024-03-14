'use client'

import { ButtonsOnboarding } from '@/types/onboarding-types';
import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies';

import api from '@/api/api';

import './ButtonsOnboarding.css';

export default function ButtonsOnboarding() {
    const [genres, setGenres] = useState([]);

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

    function handleChangeClassName(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.classList.value === 'button-default-gender') {
            e.currentTarget.classList.replace('button-default-gender', 'button-selected-gender');
        } else {
            e.currentTarget.classList.replace('button-selected-gender', 'button-default-gender');
        }
    }

    return (
        <section className='onboarding-container-button-list'>
            {genres.map((genre) => {
                return (
                    <section className='onboarding-button-list' key={genre.id}>
                        <button
                            type='button'
                            className='button-default-gender'
                            onClick={handleChangeClassName} 
                            >
                            {genre.gender}
                        </button>
                    </section>
                );
            })}
        </section>
    )
}