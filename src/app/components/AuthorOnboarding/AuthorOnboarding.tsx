'use client'

import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies';

import api from '@/api/api';

import './AuthorOnboarding.css';

import { Pagination, Navigation, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

export default function AuthorOnboarding() {
    const [authors, setAuthors] = useState([]);

    interface AuthorsGenders {
        id: string;
        name: string;
        imageUrl: string;
        birthplace: string;
        carrerDescription: string;
        createdAt: string;
        updatedAt: string;
        Genders: { gender: { id: string; gender: string } }[];
    }
    
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

    function handleChangeClassName(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.classList.value === 'onboarding-author-list') {
            e.currentTarget.classList.replace('onboarding-author-list', 'onboarding-author-list-selected');
        } else {
            e.currentTarget.classList.replace('onboarding-author-list-selected', 'onboarding-author-list');
        }
    }

    function handleAuthorGenrer(authors: AuthorsGenders) {
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

    return (
        <div>
            <section className='onboarding-container-author-list-mobile'>
                {authors.map((author) => {
                    const authorGender = handleAuthorGenrer(author);
                            
                    return (
                        <section className='onboarding-author-list' key={author.id} onClick={handleChangeClassName}>
                            <img src={author.imageUrl} className='author-image-onboarding' />
        
                            <article className='author-division-onboarding'>
                                <span className='author-title-onboarding'>{author.name}</span>
                                <span className='author-genre-onboarding'>{authorGender}</span>
                            </article>
                        </section> 
                    );
                })}
            </section>

            <section className='onboarding-container-author-list-tablet'>
                <Swiper
                    modules={[Pagination, Grid]}
                    slidesPerView={3}
                    slidesPerGroup={3}
                    grid={{rows: 2}}
                    spaceBetween={24}
                    pagination={{ clickable: true, }}
                    className='onboarding-carrousel'
                >
                {authors.map((author) => {
                    const authorGender = handleAuthorGenrer(author);
                    return (
                        <SwiperSlide key={author.id}>
                            <div className='onboarding-author-list' onClick={handleChangeClassName}>
                                <img src={author.imageUrl} alt={author.name} className="author-image-onboarding" />
    
                                <div className='author-division-onboarding'>
                                    <span className="author-title-onboarding">{author.name}</span>
                                    <span className="author-genre-onboarding">{authorGender}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                </Swiper>
            </section>

            <section className='onboarding-container-author-list-desktop'>
                <Swiper
                    modules={[Navigation, Pagination, Grid]}
                    slidesPerView={3}
                    slidesPerGroup={3}
                    navigation
                    grid={{rows: 2}}
                    spaceBetween={24}
                    pagination={{ clickable: true, }}
                    className='onboarding-carrousel'
                >
                {authors.map((author) => {
                    const authorGender = handleAuthorGenrer(author);
                    return (
                        <SwiperSlide key={author.id}>
                            <div className='onboarding-author-list' onClick={handleChangeClassName}>
                                <img src={author.imageUrl} alt={author.name} className="author-image-onboarding" />
    
                                <div className='author-division-onboarding'>
                                    <span className="author-title-onboarding">{author.name}</span>
                                    <span className="author-genre-onboarding">{authorGender}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                </Swiper>
            </section>
        </div>
    )
}