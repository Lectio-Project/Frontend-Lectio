'use client'

import { useDataContext } from "@/context/user";
import { getCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { Book } from '@/types/home-types';
import { useMediaQuery } from "@mui/material";

import Header from "@/app/components/Header/Header";
import HomeImage from "@/app/assets/homeImage.svg";
import ContainerBookHome from "@/app/components/ContainerBookHome/ContainerBookHome";
import ContainerThoughtHome from "@/app/components/ContainerThoughtHome/ContainerThoughtHome";

import api from "@/api/api";

import './home.css';

export default function Home() {
    const {onboarding} = useDataContext();
    const [books, setBooks] = useState<Book[]>([]);
    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)');
    
    useEffect(() => {
        handleOnboardingSteps();
    }, [])

    async function handleOnboardingSteps() {
        try {
            if (onboarding !== undefined) {
                const token = await getCookie('token');
    
                await api.patch('/users', onboarding, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } catch (error) {
            return console.error(error);
        }
    }

    useEffect(() => {
        listBooks();
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

    return (
        <main className='container-home'>
            <Header search='able' select='home' />
            <section className='introduction-section-home'>
                <h3 className='title-home'>Boas vindas <span>Nome</span>!</h3>
                <h4 className='text-home'>Veja o que está rolando de melhor na literatura brasileira</h4>
                <img src={HomeImage} alt='' className='lover-books-home'/>
            </section>
            <section className='container-books-section-home'>
                <h4 className='title-section-home'>De olho na Flip</h4>
                <p className='text-section-home'>O melhor da literatura nacional para você</p>
                <ContainerBookHome books={books} isTablet={isTablet} isDesktop={isDesktop}/>
            </section>
            <section className='container-authors-section-home'>
                <h4 className='title-section-home'>Autores em destaque</h4>
                <p className='text-section-home'>Conheça os brilhantes autores em evidência</p>
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
        </main>
    )
}