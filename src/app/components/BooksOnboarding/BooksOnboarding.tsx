'use client'

import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies';
import { Book, BooksOnboarding } from '@/types/onboarding-types';

import api from '@/api/api';

import './BooksOnboarding.css';

export default function BooksOnboarding({ selectedBooks, setSelectedBooks }: BooksOnboarding) {
    const [books, setBooks] = useState<Book[]>([]);

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

    const handleBookSelection = (e: React.MouseEvent<HTMLElement>, book: Book) => {
        const isBookSelected = selectedBooks.includes(book);
    
        if (isBookSelected) {
            setSelectedBooks(selectedBooks.filter((selectedBook: Book) => selectedBook !== book));
            e.currentTarget.classList.replace('selected-book-list', 'default-book-list');
        } else if (selectedBooks.length < 3) {
            setSelectedBooks([...selectedBooks, book]);
            e.currentTarget.classList.replace('default-book-list', 'selected-book-list');
        } else {
            alert('Você só pode selecionar no máximo 3 livros.');
        }
    }

    return (
        <section className='onboarding-container-book-list'>
            {books.map((book) => {
                return (
                    <section className='default-book-list'  onClick={(e) => handleBookSelection(e, book)} key={book.id}>
                        <img src={book.imageUrl} className='book-image-onboarding'/>
                        <span className='book-title-onboarding'>{book.name}</span>
                        <span className='book-author-onboarding'>{book.publishingCompany}</span>
                    </section>
                )
            })}
        </section>
    )
}