'use client'

import ArrowBlack from '../../../assets/arrowButton.svg';
import ArrowYellow from '../../../assets/arrowGoYellow.svg';
import ArrowGray from '../../../assets/arrowBottom.svg';

import CommentUser from '../../../assets/commentUser.svg';

import Header from '@/app/components/Header/Header';

import api from '@/api/api';

import { useEffect, useState } from 'react';

import './book-details.css';
import { getCookie } from '@/utils/cookies';
import RatingStars from '@/app/components/Rating/Rating';
import ButtonViewMore from '@/app/components/ButtonViewMore/ButtonViewMore';
import { useMediaQuery } from '@mui/material';

export default function BookDetails() {
    const [bookData, setBookData] = useState<BookProps>({name: '', publishYear: '', publishingCompany: '', synopsis: '', imageUrl: '', avgGrade: 0, gender: {id: '', gender: ''}, AuthorBook: [{ author: {id: "", name: "", imageUrl: ""}}], Comment: ['']});
    const [showDescription, setShowDescription] = useState(false);
    const [showInfoTechnical, setShowInfoTechnical] = useState(false);
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

    const id = '65fc791b65536490790636c6';
    
    // {
    //     "id": "65fc791b65536490790636c6",
    //     "name": "Olhos D'água",
    //     "publishYear": "2014",
    //     "publishingCompany": "Pallas",
    //     "synopsis": "Em Olhos d’água, Conceição Evaristo ajusta o foco de seu interesse na população afro-brasileira abordando, sem meias palavras, a pobreza e a violência urbana que acometem.",
    //     "imageUrl": "https://lectio.s3.us-east-005.backblazeb2.com/books/olhos-dagua.jpg",
    //     "totalGrade": 0,
    //     "counterGrade": 0,
    //     "avgGrade": 0,
    //     "createdAt": "2024-03-21T18:14:51.672Z",
    //     "updatedAt": "2024-03-21T18:14:51.672Z",
    //     "gender": {
    //       "id": "65f31ea8c60b72e59511c8d3",
    //       "gender": "Ficção Científica"
    //     },
    //     "AuthorBook": [
    //       {
    //         "author": {
    //           "id": "6051a5fe4a3d7e126c9d24b8",
    //           "name": "Conceição Evaristo",
    //           "imageUrl": "https://lectio.s3.us-east-005.backblazeb2.com/authors/concei%C3%A7%C3%A3o-evaristo.jpg"
    //         }
    //       }
    //     ],
    //     "Comment": []
    // }

    interface BookProps {
        name: string;
        publishYear: string;
        publishingCompany: string
        synopsis: string;
        avgGrade: number;
        imageUrl: string;
        gender: {id: string; gender: string};
        AuthorBook: { author: { id: string; name: string; imageUrl: string } }[];
        Comment: string[];
    }

    async function handleBookData() {
        try {
            const token = await getCookie('token');
            const response = await api.get(`/books/${id}?add=comment`, {
                headers: {
                authorization: `Bearer ${token}`
                },
            });

            setBookData(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleBookData();

        // let handleFindGenders;
        
        // if (book?.gender.length > 1) {
        //     handleFindGenders = book?.gender.map((item: GenderProps) => item.gender);
        // } else {
        //     handleFindGenders = book?.gender.gender;
        // }

        // console.log(handleFindGenders);
        // setGenderForBook(handleFindGenders);
        
        
    }, [])

    function handleFindBook() {
        const bookName = bookData?.name;
        return bookName.replaceAll(' ', '+');
    }

    return (
        <section className='container-book'>
            <Header search='able' select='feed' />

            <main className='content-container'>
                <div className='book-info-reduced'>
                    <div className='book-title-author-mobile'>
                        <h3 className='book-title'>{bookData.name}</h3>
                        <span className='book-author'>por <span>{bookData.AuthorBook[0].author.name}</span></span>
                    </div>

                    <img src={bookData.imageUrl} className='book-image' />

                    <div className='local-genres-area-mobile'>
                        <span className='genre-title'>Gênero</span>
                        <span className='genre-book'>{bookData.gender.gender}</span>
                    </div>

                    <div className='book-review-mobile'>
                        <div className='note-book'>
                            <RatingStars starsValues={bookData.avgGrade} size='medium' readOnly bookValue={bookData.avgGrade} />
                        </div>
                        
                        <div className='assessments-and-reviews'>
                            <span>16.648 avaliações</span>
                            <span>·</span>
                            <span>1.519 resenhas</span>
                        </div>
                    </div>

                    <a className='button-book' href={`https://www.amazon.com.br/s?k=${handleFindBook()}`} >
                        <span>Quero ler!</span>
                        <img src={ArrowBlack} alt="" />
                    </a>

                    <div className='rating-book'>
                        <RatingStars starsValues={0} size='medium' readOnly />
                        <span className='rating-book-title'>Avalie a obra</span>
                    </div>
                </div> 

                <div className='book-info-large'>
                    <div className='book-title-author-desktop'>
                        <h3 className='book-title'>{bookData.name}</h3>
                        <span className='book-author'>por <span>{bookData.AuthorBook[0].author.name}</span></span>
                    </div>

                    <div className='book-review-desktop'>
                        <div className='note-book'>
                            <RatingStars starsValues={bookData.avgGrade} size={isTablet ? 'medium' : 'large'} readOnly bookValue={bookData.avgGrade} />
                        </div>
                        
                        <div className='assessments-and-reviews'>
                            <span>16.648 avaliações</span>
                            <span>·</span>
                            <span>1.519 resenhas</span>
                        </div>
                    </div>

                    <div className='local-genres-area-desktop'>
                        <span className='genre-title'>Gênero</span>
                        <span className='genre-book'>{bookData.gender.gender}</span>
                    </div>

                    <div className={showDescription ? 'book-description-open' : 'book-description'}>
                        <p className='book-description-text'>
                            {bookData.synopsis} 
                        </p>
                    </div>

                    <div className='book-description-button' onClick={() => setShowDescription(!showDescription)}>
                        <span>{showDescription ? 'Minimizar' : 'Saiba mais' }</span>
                        <img className={showDescription ? 'arrow-top-button' : 'arrow-bottom-button'} src={ArrowYellow} alt="" />
                    </div>

                <button 
                    className={showInfoTechnical ? 'button-informations-open' : 'button-informations-close'} 
                >
                    <div className='button-informations-top' onClick={() => setShowInfoTechnical(true)}>
                        <strong>Informações técnicas</strong>
                        <img src={ArrowGray} 
                            alt='ícone para expandir o botão'
                            className={showInfoTechnical ? 'button-informations-arrowTop' : 'button-informations-arrowBottom' }
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowInfoTechnical(!showInfoTechnical)
                            }}
                        />
                    </div>

                    {showInfoTechnical && (
                        <section className='button-informations'>
                            <div className='button-informations-info'>
                                <h3>Ano de publicação</h3>
                                <h3>Editora</h3>
                                <h3>Prêmios literários</h3>
                                <h3>Número de páginas</h3>
                                <h3>ISBN</h3>
                            </div>

                            <div className='button-informations-info'>
                                <p>{bookData.publishYear}</p>
                                <p>{bookData.publishingCompany}</p>
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
                                        <RatingStars starsValues={5} size='small' readOnly />
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
                                        <RatingStars starsValues={5} size='small' readOnly />
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
                                        <RatingStars starsValues={5} size='small' readOnly />
                                    </div>
                                
                                    <span className='comment-date'>postado em 25 de junho às 14:30</span>
                                </div>
                            </div>

                            <p>Este livro é uma verdadeira jóia literária. Com uma trama envolvente, personagens cativantes e escrita habilidosa, Evaristo proporciona uma experiência de leitura memorável. Recomendo sem hesitação!</p>
                        </article>
                    </section>
              
                    <ButtonViewMore className='button-more-comments' title='Ver mais comentários' type='button' />
                </section>

                    <section className='more-books-author'>
                        <h3>Você também pode se interessar...</h3>
                        <span>Livros também escritos por {bookData.AuthorBook[0].author.name}:</span>
                    </section>

                    <p>Component</p>
                </div>
                </main>
        </section>
    )
}