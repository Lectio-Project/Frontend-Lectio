'use client'

import ArrowButton from '../../../assets/arrowButton.svg';
import ArrowRead from '../../../assets/arrowGoYellow.svg';
import CommentUser from '../../../assets/commentUser.svg';
import Book from '../../../assets/book.svg';
import ArrowBottom from '../../../assets/arrowBottom.svg';

import Header from '@/app/components/Header/Header';
import { Box, Rating } from '@mui/material';

import api from '@/api/api';

import { useEffect, useState } from 'react';

import './details-book.css';

export default function DetailsBook() {
    const [book, setBook] = useState<BookProps>();
    const [showDescription, setShowDescription] = useState(false);
    const [showInfoTechnical, setShowInfoTechnical] = useState(false);
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

    console.log(showInfoTechnical);
    

    // useEffect(() => {
    //     handleBook();
    //     // let handleFindGenders;
        
    //     // if (book?.gender.length > 1) {
    //     //     handleFindGenders = book?.gender.map((item: GenderProps) => item.gender);
    //     // } else {
    //     //     handleFindGenders = book?.gender.gender;
    //     // }

    //     // console.log(handleFindGenders);
    //     // setGenderForBook(handleFindGenders);
        
        
    // }, [])

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

                <a className='button-book' href="https://www.amazon.com.br/s?k=Olhos+D'Água">
                    <span>Quero ler!</span>
                    <img src={ArrowButton} alt="" />
                </a>

                <div className='book-rating'>
                    <Rating defaultValue={0} precision={0.5} size='large' readOnly />
                    <span className='book-rating-title'>Avalie a obra</span>
                </div> 

                <div className={showDescription ? 'book-description-open' : 'book-description'}>
                    <p className='book-description-text'>
                        Publicado em 2014, “Olhos D’Água” reúne 15 contos que retratam a violência urbana que atinge a população negra brasileira. 
                    </p>
                    <p className='book-description-text'>
                    As mulheres são as personagens centrais desse contexto de desigualdade social, narrado com propriedade por Conceição Evaristo. Mães, filhas, avós, amantes, mulheres e, também, homens, com histórias de várias realidades brasileiras, protagonizam essas narrativas.
                    </p>
                </div>

                <div className='book-description-read' onClick={() => setShowDescription(!showDescription)}>
                    <span>{showDescription ? 'Minimizar' : 'Saiba mais' }</span>
                    <img className={showDescription ? 'arrow-top' : 'arrow-bottom'} src={ArrowRead} alt="" />
                </div>

                <button 
                    className={showInfoTechnical ? 'button-informations-open' : 'button-informations-close'} 
                >
                    <div className='button-informations-top' onClick={() => setShowInfoTechnical(true)}>
                        <strong>Informações técnicas</strong>
                        <img src={ArrowBottom} 
                            alt='ícone para expandir o botão'
                            className={showInfoTechnical ? 'button-informations-arrowTop' : 'button-informations-arrowBottom' }
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowInfoTechnical(false)
                            }}
                        />
                    </div>

                    {showInfoTechnical && (
                        <section className='button-informations'>
                            <div className='button-informations-info'>
                                <h3>Editora</h3>
                                <h3>Prêmios literários</h3>
                                <h3>Número de páginas</h3>
                                <h3>ISBN</h3>
                            </div>

                            <div className='button-informations-info'>
                                <p>2014</p>
                                <p>Pallas</p>
                                <p>Prêmio Jabuti (2015)</p>
                                <p>116</p>
                                <p>9788533307391, 9788534705974, & 9788534705257.</p>
                            </div>
                        </section>
                    )}
                </button>

                <section className='container-comments'>
                    <h3 className='comments-title'>Comentários</h3>
                    <span className='comments-published'>3 comentários publicados</span>

                    <section className='comments'>
                        <article className='comment-user'>
                            <div className='comment-user-intern'>
                                <img src={CommentUser} alt="" />
                                
                                <div className='comment-user-info'>
                                    <div>
                                        <strong className='comment-username'>Marcelo Tavares</strong>
                                        <Rating defaultValue={5} precision={0.5} size='medium' readOnly />
                                    </div>
                                
                                    <span className='comment-date'>postado em 25 de junho às 14:30</span>
                                </div>
                            </div>

                            <p>Este livro é uma verdadeira jóia literária. Com uma trama envolvente, personagens cativantes e escrita habilidosa, Evaristo proporciona uma experiência de leitura memorável. Recomendo sem hesitação!</p>
                        </article>

                        <article className='comment-user'>
                            <div className='comment-user-intern'>
                                <img src={CommentUser} alt="" />
                                
                                <div className='comment-user-info'>
                                    <div>
                                        <strong className='comment-username'>Marcelo Tavares</strong>
                                        <Rating defaultValue={5} precision={0.5} size='medium' readOnly />
                                    </div>
                                
                                    <span className='comment-date'>postado em 25 de junho às 14:30</span>
                                </div>
                            </div>

                            <p>Este livro é uma verdadeira jóia literária. Com uma trama envolvente, personagens cativantes e escrita habilidosa, Evaristo proporciona uma experiência de leitura memorável. Recomendo sem hesitação!</p>
                        </article>

                        <article className='comment-user'>
                            <div className='comment-user-intern'>
                                <img src={CommentUser} alt="" />
                                
                                <div className='comment-user-info'>
                                    <div>
                                        <strong className='comment-username'>Marcelo Tavares</strong>
                                        <Rating defaultValue={5} precision={0.5} size='medium' readOnly />
                                    </div>
                                
                                    <span className='comment-date'>postado em 25 de junho às 14:30</span>
                                </div>
                            </div>

                            <p>Este livro é uma verdadeira jóia literária. Com uma trama envolvente, personagens cativantes e escrita habilidosa, Evaristo proporciona uma experiência de leitura memorável. Recomendo sem hesitação!</p>
                        </article>
                    </section>
              
                    <a className='button-more-comments' href='#'>
                        <span>Ver mais comentários</span>
                        <img src={ArrowRead} alt="" />
                    </a>
                </section>

                <section className='more-books-author'>
                    <h3>Você também pode se interessar...</h3>
                    <span>Livros também escritos por Conceição Evaristo:</span>
                </section>
        </main>
    )
}