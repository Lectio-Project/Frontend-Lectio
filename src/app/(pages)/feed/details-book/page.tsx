'use client'

import ArrowButton from '../../../assets/arrowButton.svg';
import CommentUser from '../../../assets/commentUser.svg';

import Header from '@/app/components/Header/Header';
import { Box, Rating } from '@mui/material';

import api from '@/api/api';

import { useEffect, useState } from 'react';

import './details-book.css';

export default function DetailsBook() {
    const [book, setBook] = useState<BookProps>();
    const [genderForBook, setGenderForBook] = useState<GenderProps>();

    const id = '65fc791b65536490790636c6';

    interface BookProps {
        name: string;
        gender: {id: string; gender: string};
        AuthorBook: { author: { id: string; name: string; imageUrl: string } }[];
    }

    interface GenderProps {
        id: string;
        gender: string;
    }

    useEffect(() => {
        handleBook();
        // let handleFindGenders;
        
        // if (book?.gender.length > 1) {
        //     handleFindGenders = book?.gender.map((item: GenderProps) => item.gender);
        // } else {
        //     handleFindGenders = book?.gender.gender;
        // }

        // console.log(handleFindGenders);
        // setGenderForBook(handleFindGenders);
        
        
    }, [])

    async function handleBook() {
        try {
            const response = await api.get(`/books/${id}`);
            setBook(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const labels: { [index: string]: string } = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: '4.0',
        4.5: 'Excellent',
        5: 'Excellent+',
      };

    return (
        <main>
           <Header search='able' select='feed' />

           <section className='details-book'>
                <h2 className='details-book-title'>{book?.name}</h2>
                <span className='details-book-author'>por <span>{book?.AuthorBook[0].author.name}</span></span>

                <img src={book?.imageUrl} className='details-book-image'/>

                <div className='list-genres-book'>
                    <span className='genre-title'>Gênero</span>
                    <span className='book-genre'>{book?.gender.gender}</span>
                </div>

                <div className='book-review'>
                    <div className='rating-book'>
                        <Rating className='rating-stars' defaultValue={4} precision={0.5} size='large' readOnly />
                        <Box sx={{ ml: 2 }}>{labels[4]}</Box>
                    </div>

                    <div className='assessments-and-reviews'>
                        <span>16.648 avaliações</span>
                        <span>·</span>
                        <span>1.519 resenhas</span>
                    </div>
                </div>
            </section>

                <div className='button-book'>
                    <button>Quero ler!</button>
                    <img src={ArrowButton} alt="" />
                </div>
                    
                <Rating defaultValue={0} precision={0.5} size='large' readOnly />
                <span>Avalie a obra</span>

                <p>
                    Publicado em 2014, “Olhos D’Água” reúne 15 contos que retratam a violência urbana que atinge a população negra brasileira. As mulheres são as personagens centrais desse contexto de desigualdade social, narrado com propriedade por Conceição Evaristo. Mães, filhas, avós, amantes, mulheres e, também, homens, com histórias de várias realidades brasileiras, protagonizam essas narrativas.
                </p>

                <span>Saiba mais</span>
                <img src="" alt="" />

                <button>Informações técnicas</button>

                <h3>Comentários</h3>
                <span>3 comentários publicados</span>

                <section className='comments'>
                    <article className='comment-user'>
                        <img src="" alt="" />
                        
                        <strong>Marcelo Tavares</strong>
                        <Rating defaultValue={5} precision={0.5} size='small' readOnly />
                        
                        <span>postado em 25 de junho às 14:30</span>

                        <p>Este livro é uma verdadeira jóia literária. Com uma trama envolvente, personagens cativantes e escrita habilidosa, Evaristo proporciona uma experiência de leitura memorável. Recomendo sem hesitação!</p>
                    </article>

                    <article className='comment-user'>
                        <img src={CommentUser} alt="" />
                        
                        <strong>Marcelo Tavares</strong>
                        <Rating defaultValue={5} precision={0.5} size='small' readOnly />
                        
                        <span>postado em 25 de junho às 14:30</span>

                        <p>Este livro é uma verdadeira jóia literária. Com uma trama envolvente, personagens cativantes e escrita habilidosa, Evaristo proporciona uma experiência de leitura memorável. Recomendo sem hesitação!</p>
                    </article>

                    <article className='comment-user'>
                        <img src={CommentUser} alt="" />
                        
                        <strong>Marcelo Tavares</strong>
                        <Rating defaultValue={5} precision={0.5} size='small' readOnly />
                        
                        <span>postado em 25 de junho às 14:30</span>

                        <p>Este livro é uma verdadeira jóia literária. Com uma trama envolvente, personagens cativantes e escrita habilidosa, Evaristo proporciona uma experiência de leitura memorável. Recomendo sem hesitação!</p>
                    </article>
                </section>

                    <button>Ver mais comentários</button>

                    <h3>Você também pode se interessar...</h3>
                    <span>Livros também escritos por Conceição Evaristo:</span>
        </main>
    )
}