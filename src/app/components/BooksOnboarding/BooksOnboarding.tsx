'use client'

import { useEffect, useState } from 'react';

import api from '@/api/api';

import './BooksOnboarding.css';

export default function BooksOnboarding() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        listBooks();
    }, []);

    const listBooks = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWQ5ZTRhZjJjNjQ3OTQ0ZjNlZGUzZCIsIm5hbWUiOiJKb2FuYSBTb2FyZXMiLCJlbWFpbCI6ImpvYW5hM0BlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCRNQVhQZEhTU2ZaR3hCbHFTWXlTWXh1Qy5OUlBZOEkxOEkxZjY5OFNIQlBQVGFaRGlGVmRTMiIsInVzZXJuYW1lIjoiQGpvYW5hMTcxMDA3MTM3MDQxMSIsImJpbyI6bnVsbCwiaW1hZ2VVcmwiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDMtMTBUMTE6NDk6MzAuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDMtMTBUMTE6NDk6MzAuNjU4WiIsImlhdCI6MTcxMDA5NTkwMSwiZXhwIjoxNzEwNzAwNzAxfQ.k4QgNp5yPfBUrKecqc_m7BoOsZJORhyiX6ui8gQyH8Q';

        try {
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