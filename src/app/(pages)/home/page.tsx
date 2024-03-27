'use client'

import { useDataContext } from "@/context/user";
import { getCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { Book } from '@/types/home-types';
import { useMediaQuery } from "@mui/material";

import Header from "@/app/components/Header/Header";
import HomeImage from "@/app/assets/homeImage.svg";
import ContainerBookHome from "@/app/components/ContainerBookHome/ContainerBookHome";

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
            
            const response = await api.get('/books', 
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
            <section>
                <h3>Boas vindas Nome!</h3>
                <h4>Veja o que está rolando na literatura brasileira</h4>
            </section>
            <img src={HomeImage} alt='' className='lover-books-home'/>
            <section>
                <h4>De olho na Flip</h4>
                <p>O melhor da literatura nacional para você</p>
                <ContainerBookHome books={books} isTablet={isTablet} isDesktop={isDesktop}/>
            </section>
        </main>
    )
}