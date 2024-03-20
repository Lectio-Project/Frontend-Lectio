'use client'

import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies';
import { Author, AuthorsOnboarding } from '@/types/onboarding-types';

import useMediaQuery from '@mui/material/useMediaQuery';

import { Pagination, Navigation, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

import api from '@/api/api';

import './AuthorOnboarding.css';

export default function AuthorOnboarding({ selectedAuthors, setSelectedAuthors }: AuthorsOnboarding) {
    const [authors, setAuthors] = useState<Author[]>([]);
    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)'); 
    
    useEffect(() => {
        listAuthors();
    }, []);

    const listAuthors = async () => {
        try {
            const token = await getCookie('token');
            
            const response = await api.get('/authors?add=gender', 
                { headers: {
                    Authorization: `Bearer ${token}`
                }});
                
            setAuthors(response.data);
        } catch (error: any) {
            console.error(error)
        }
    }

    const handleAuthorSelection = (e: React.MouseEvent<HTMLElement>, author: Author) => {
        const isAuthorSelected = selectedAuthors.includes(author);
        
        if (isAuthorSelected) {
            setSelectedAuthors(selectedAuthors.filter((selectedAuthors: Author) => selectedAuthors !== author));
            e.currentTarget.classList.replace('selected-author-list', 'default-author-list');
        } else if (selectedAuthors.length < 3) {
            setSelectedAuthors([...selectedAuthors, author]);
            e.currentTarget.classList.replace('default-author-list', 'selected-author-list');
        } else {
            alert('Você só pode selecionar no máximo 3 autores.');
        }
    }

    function handleAuthorGenrer(authors: Author) {
        let authorsGenderArray: string[] = [];
        let authorGender: string;

        authors.Genders.forEach(element => {
            if (element.hasOwnProperty('gender')) {
                authorsGenderArray.push(element.gender.gender);
            }
        });

        if (authorsGenderArray.length > 1) {
            authorGender = authorsGenderArray.join(' / ');
        } else {
            authorGender = authorsGenderArray[0];
        }

        return authorGender;
    }

    return isTablet ? (
        <Swiper
            className='onboarding-container-authors'
            modules={[Pagination, Navigation, Grid]}
            slidesPerView={isDesktop ? 3 : (isTablet && 2)}
            slidesPerGroup={isDesktop ? 3 : (isTablet && 2)}
            grid={isDesktop ? {rows: 2} : (isTablet && {rows: 3})}
            spaceBetween={isDesktop ? 60 : (isTablet && 28)}
            pagination={{ clickable: true, }}
            navigation={isDesktop ? true : (isTablet && false)}
        >
            {authors.map((author) => {
                const authorGender = handleAuthorGenrer(author);

                return (
                    <SwiperSlide key={author.id}>
                        <section className='default-author-list' onClick={(e) => handleAuthorSelection(e, author)}>
                            <img src={author.imageUrl} alt={author.name} className="author-image-onboarding" />

                            <div className='author-division-onboarding'>
                                <span className="author-title-onboarding">{author.name}</span>
                                <span className="author-genre-onboarding">{authorGender}</span>
                            </div>
                        </section>
                    </SwiperSlide>
                );
            })}
        </Swiper>
        ) : (
        <section className='onboarding-container-author-list'>
        {authors.map((author) => {
            const authorGender = handleAuthorGenrer(author);
                    
            return (
                <section className='default-author-list' key={author.id} onClick={(e) => handleAuthorSelection(e, author)}>
                    <img src={author.imageUrl} className='author-image-onboarding' />

                    <article className='author-division-onboarding'>
                        <span className='author-title-onboarding'>{author.name}</span>
                        <span className='author-genre-onboarding'>{authorGender}</span>
                    </article>
                </section> 
            );
        })}
    </section>
)};