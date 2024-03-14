'use client'

import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies';

import api from '@/api/api';

import './AuthorOnboarding.css';

export default function AuthorOnboarding() {
    const [authors, setAuthors] = useState([]);

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

    return (
        <section className='onboarding-container-author-list'>
            {authors.map((author) => {
                let authorsGenderArray = [];
                let authorGender = "";

                author.Genders.forEach(element => {
                    if (element.hasOwnProperty('gender')) {
                        authorsGenderArray.push(element.gender.gender);
                    }
                });

                if (authorsGenderArray.length > 1) {
                    authorGender = authorsGenderArray.join(' / ');
                } else {
                    authorGender = authorsGenderArray[0];
                }
                
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
    )
}