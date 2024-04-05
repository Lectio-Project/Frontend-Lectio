'use client'

import { useDataContext } from "@/context/user";
import { getCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Book } from '@/types/home-types';
import { Author } from "@/types/onboarding-types";

import Header from "@/app/components/Header/Header";
import HomeImage from "@/app/assets/homeImage.svg";
import ContainerBookHome from "@/app/components/ContainerBookHome/ContainerBookHome";
import ContainerAuthorHome from "@/app/components/ContainerAuthorHome/ContainerAuthorHome";
import ContainerThoughtHome from "@/app/components/ContainerThoughtHome/ContainerThoughtHome";

import api from "@/api/api";

import './home.css';

export default function Home() {
    const {userData, onboarding, setOnboarding} = useDataContext();
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)');
    
    // useEffect(() => {
    //     handleOnboardingSteps();
    // }, [])

    // async function handleOnboardingSteps() {
    //     try {
    //         const token = await getCookie('token');      

    //         for (const item in onboarding) {
    //             if (onboarding.hasOwnProperty(item) && Array.isArray(onboarding[item]) && onboarding[item].length === 0) {
    //                 delete onboarding[item];
    //             }
    //         }

    //         const request = {...onboarding, checkOnBoarding: true}
            
    //         await api.patch('/users', request, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });  
            
    //         setOnboarding({ genresId: [], authorsId: [], booksId: [] })
            
    //     } catch (error) {
    //         return console.error(error);
    //     } 
    // }

    useEffect(() => {
        listBooks();
        listAuthors();
    }, []);

    const listBooks = async () => {
        try {
            const token = await getCookie('token');
            
            const response = await api.get('/books?add=thought', 
                { headers: {
                    Authorization: `Bearer ${token}`
                }});
            setBooks(response.data);
        } catch (error: any) {
            console.error(error);
        }
    }

    const listAuthors = async () => {
        try {
            const token = await getCookie('token');
            
            const response = await api.get('/authors?add=gender', 
                { headers: {
                    Authorization: `Bearer ${token}`
                }});
            setAuthors(response.data);
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <main className='container-home'>
            <Header search='able' select='home' />
            <section className='introduction-section-home'>
                <div className='introduction-texts-home'>
                    <h3 className='title-home'>Boas vindas <span>{userData.name}</span>!</h3>
                    <h4 className='text-home'>Veja o que está rolando de melhor na literatura brasileira</h4>
                </div>
                <img src={HomeImage} alt='' className='lover-books-home'/>
            </section>
            <section className='container-books-section-home'>
                <h4 className='title-section-home first-title-section-home'>De olho na Flip</h4>
                <p className='text-section-home'>O melhor da literatura nacional para você</p>
                <ContainerBookHome books={books} isTablet={isTablet} isDesktop={isDesktop}/>
            </section>
            <section className='container-authors-section-home'>
                <h4 className='title-section-home'>Autores em destaque</h4>
                <p className='text-section-home'>Conheça os brilhantes autores em evidência</p>
                <ContainerAuthorHome authors={authors} isTablet={isTablet} isDesktop={isDesktop}/>
            </section>
            <section className='container-thoughts-section-home'>
                <h4 className='title-section-home'>Pensamentos brasileiros</h4>
                <p className='text-section-home'>Frases nascidas em mentes nacionais</p>
                <ContainerThoughtHome books={books} isTablet={isTablet} isDesktop={isDesktop}/>
            </section>
            <section className='container-top-rating-books-home'>
                <h4 className='title-section-home'>Livros mais bem avaliados</h4>
                <p className='text-section-home'>Livros em destaque para você</p>
                <ContainerBookHome books={books} isTablet={isTablet} isDesktop={isDesktop} sort={true}/>
            </section>
            <span className='copyright'>Copyright 2022. Todos os direitos reservados.</span>
        </main>
    )
}