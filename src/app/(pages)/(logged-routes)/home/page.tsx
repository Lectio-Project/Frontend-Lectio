'use client';

import { useDataContext } from '@/context/user';
import { Book } from '@/types/home-types';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import HomeImage from '@/app/assets/homeImage.svg';
import ContainerAuthorHome from '@/app/components/ContainerAuthorHome/ContainerAuthorHome';
import ContainerBookHome from '@/app/components/ContainerBookHome/ContainerBookHome';
import ContainerThoughtHome from '@/app/components/ContainerThoughtHome/ContainerThoughtHome';
import Header from '@/app/components/Header/Header';

import api from '@/api/api';

import { AuthorProps } from '@/types/author';
import { useSession } from 'next-auth/react';
import './home.css';

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<AuthorProps[]>([]);
    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const { userData } = useDataContext();
    const firstNameUser = userData.name ? userData.name.split(' ')[0] : '';

    const { data } = useSession();

    useEffect(() => {
        getData();
    }, [data]);

    const getData = async () => {
        const request = [
            api.get('/books?add=thought'),
            api.get('/authors?add=gender', {
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            })
        ];
        const [responseBook, responseAuthor] = await Promise.all(request);
        setBooks(responseBook.data);
        setAuthors(responseAuthor.data);
    };

    return (
        <main className="container-home">
            <Header search="able" select="home" />
            <section className="introduction-section-home">
                <div className="introduction-texts-home">
                    <h3 className="title-home">
                        Boas vindas <span>{firstNameUser}</span>!
                    </h3>
                    <h4 className="text-home">
                        Veja o que está rolando de melhor na literatura
                        brasileira
                    </h4>
                </div>
                <img src={HomeImage} alt="" className="lover-books-home" />
            </section>
            <section className="container-books-section-home">
                <h4 className="title-section-home">De olho na Flip</h4>
                <p className="text-section-home">
                    O melhor da literatura nacional para você
                </p>
                <ContainerBookHome
                    books={books}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                />
            </section>
            <section className="container-authors-section-home">
                <h4 className="title-section-home">Autores em destaque</h4>
                <p className="text-section-home">
                    Conheça os brilhantes autores em evidência
                </p>
                <ContainerAuthorHome
                    authors={authors}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                />
            </section>
            <section className="container-thoughts-section-home">
                <h4 className="title-section-home">Pensamentos brasileiros</h4>
                <p className="text-section-home">
                    Frases nascidas em mentes nacionais
                </p>
                <ContainerThoughtHome
                    books={books}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                />
            </section>
            <section className="container-top-rating-books-home">
                <h4 className="title-section-home">
                    Livros mais bem avaliados
                </h4>
                <p className="text-section-home">
                    Livros em destaque para você
                </p>
                <ContainerBookHome
                    books={books}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                    sort={true}
                />
            </section>
            <span className="copyright">
                Copyright 2022. Todos os direitos reservados.
            </span>
        </main>
    );
}
