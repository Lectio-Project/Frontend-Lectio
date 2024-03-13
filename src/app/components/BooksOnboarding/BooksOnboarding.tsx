'use client'

import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies';

import api from '@/api/api';

import './BooksOnboarding.css';

export default function BooksOnboarding() {
    const [books, setBooks] = useState([]);

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
            console.error(error)
        }
    }

    return (
        <section className='onboarding-container-book-list'>
            {books.map((book, key) => {
                return (
                    <section className='onboarding-book-list' key={key}>
                        <img src={book.imageUrl} className='book-image-onboarding'/>
                        <span className='book-title-onboarding'>{book.name}</span>
                        <span className='book-author-onboarding'>{book.publishingCompany}</span>
                    </section>
                )
            })}
        </section>
    )
}