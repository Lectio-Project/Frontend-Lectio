'use client';

import { useRouter } from 'next/navigation';

import { useDataContext } from '@/context/user';
import './ModalGenresSelection.css';

export default function ModalGenresSelection() {
    const router = useRouter();

    const { genres } = useDataContext();

    return (
        <main className="container-genre-search-input">
            <h3 className="title-modal-genre-selection">Busque por gênero</h3>
            <section className="name-genres-search-input">
                {genres.map((genre) => {
                    return (
                        <section className="genre-search-input" key={genre.id}>
                            <div
                                className="default-genre-search-input"
                                onClick={() =>
                                    router.push(`/search/result/${genre.id}`)
                                }
                            >
                                {genre.gender}
                            </div>
                        </section>
                    );
                })}
            </section>
        </main>
    );
}
