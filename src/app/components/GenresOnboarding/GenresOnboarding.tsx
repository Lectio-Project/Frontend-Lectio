'use client';

import { Genre, GenresOnboardingProps } from '@/types/onboarding-types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '../Loading/loading';

import { useDataContext } from '@/context/user';
import './GenresOnboarding.css';

export default function GenresOnboarding({
    selectedGenres,
    setSelectedGenres,
    page
}: GenresOnboardingProps) {
    const { onboardingGenders, setOnboardingGenders, genres } =
        useDataContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleGenreSelection = (
        e: React.MouseEvent<HTMLElement>,
        genre: Genre
    ) => {
        if (page === 'search') {
            router.push(`/search/result/${genre.id}`);
        } else if (page === 'onboarding') {
            const isGenreSelected = selectedGenres.includes(genre);

            if (isGenreSelected) {
                setSelectedGenres(
                    selectedGenres.filter(
                        (selectedGenres: Genre) => selectedGenres !== genre
                    )
                );
                e.currentTarget.classList.replace(
                    'selected-genre-list',
                    'default-genre-list'
                );
            } else if (selectedGenres.length < 3) {
                setSelectedGenres([...selectedGenres, genre]);
                e.currentTarget.classList.replace(
                    'default-genre-list',
                    'selected-genre-list'
                );
            }
        }
    };

    return isLoading ? (
        <div className="onboarding-button-loading">
            <Loading />
        </div>
    ) : (
        !isLoading && (
            <section className="onboarding-container-button-list">
                {genres.map((genre) => {
                    return (
                        <section
                            className="onboarding-button-list"
                            key={genre.id}
                        >
                            <button
                                type="button"
                                className={`default-genre-list ${
                                    page === 'search' && 'selected-genre-search'
                                }`}
                                onClick={(e) => handleGenreSelection(e, genre)}
                            >
                                {genre.gender}
                            </button>
                        </section>
                    );
                })}
            </section>
        )
    );
}
