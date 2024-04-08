'use client'

import { Genre, GenresOnboardingProps } from '@/types/onboarding-types';
import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import Loading from '../Loading/loading';

import api from '@/api/api';

import './GenresOnboarding.css';
import { useDataContext } from '@/context/user';

export default function GenresOnboarding({ selectedGenres, setSelectedGenres, page }: GenresOnboardingProps) {
    const {onboardingGenders, setOnboardingGenders} = useDataContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        if (!onboardingGenders) {
            setIsLoading(true);
            listGenres();
        }
    }, []);

    const listGenres = async () => {
        try {
            const token = await getCookie('token');
            
            const response = await api.get('/genres', 
                { headers: {
                    Authorization: `Bearer ${token}`
                }});
            setOnboardingGenders(response.data);
        } catch (error: any) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleGenreSelection = (e: React.MouseEvent<HTMLElement>, genre: Genre) => {
        if (page === 'search') {
            router.push(`/search/result/${genre.id}`);

        } else if (page === 'onboarding'){
            const isGenreSelected = selectedGenres.includes(genre);
            
            if (isGenreSelected) {
                setSelectedGenres(selectedGenres.filter((selectedGenres: Genre) => selectedGenres !== genre));
                e.currentTarget.classList.replace('selected-genre-list', 'default-genre-list');
            } else if (selectedGenres.length < 3) {
                setSelectedGenres([...selectedGenres, genre]);
                e.currentTarget.classList.replace('default-genre-list', 'selected-genre-list');
            }
        }
    }

    return isLoading ? ( 
            <div className='onboarding-button-loading'>
                <Loading />
            </div>
        ) : (!isLoading && <section className='onboarding-container-button-list'>
            {onboardingGenders?.map((genre) => {
                return (
                    <section className='onboarding-button-list' key={genre.id}>
                        <button
                            type='button'
                            className={`default-genre-list ${page === 'search' && 'selected-genre-search'}`}
                            onClick={(e) => handleGenreSelection(e, genre)}
                            >
                            {genre.gender}
                        </button>
                    </section>
                );
            })}
        </section>
    );
}