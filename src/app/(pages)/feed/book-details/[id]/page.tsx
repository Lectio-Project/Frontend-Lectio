'use client'

import ArrowBlack from '../../../../assets/arrowButton.svg';
import ArrowYellow from '../../../../assets/arrowGoYellow.svg';
import ArrowGray from '../../../../assets/arrowBottom.svg';
import CommentUser from '../../../../assets/commentUser.svg';

import Header from '@/app/components/Header/Header';
import RatingStars from '@/app/components/RatingStars/RatingStars';
import ButtonViewMore from '@/app/components/ButtonViewMore/ButtonViewMore';
import ModalRate from '@/app/components/ModalRate/ModalRate';
import Loading from '@/app/components/Loading/loading';

import { getCookie } from '@/utils/cookies';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '@/api/api';

import './book-details.css';
import { useDataContext } from '@/context/user';

type BookDetailsProps = {
    params: {id: string};
};

export default function BookDetails({params}: BookDetailsProps) {
    const [bookData, setBookData] = useState<BookProps>({name: '', publishYear: '', publishingCompany: '', synopsis: '', imageUrl: '', avgGrade: 0, gender: {id: '', gender: ''}, AuthorBook: [{ author: {id: "", name: "", imageUrl: ""}}], Comment: ['']});
    const [showDescription, setShowDescription] = useState(false);
    const [showInfoTechnical, setShowInfoTechnical] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
    
    const routeId = params.id;
    const {bookId} = useDataContext();

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

    async function handleBookData() {
        try {
            const token = await getCookie('token');
            const response = await api.get(`/books/${routeId}?add=comment`, {
                headers: {
                authorization: `Bearer ${token}`
                },
            });

            setBookData(response.data);
        } catch (error: any) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    function handleFindBook() {
        const bookName = bookData?.name;
        return bookName.replaceAll(' ', '+');
    }

    return isLoading ? (
            <div className='container-book-loading'>
                <Loading />
            </div>
        ) : ( !isLoading && <section className='container-book'>
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
                                <span>3 comentários</span>
                            </div>
                        </div>

                        <a className='button-book' href={`https://www.amazon.com.br/s?k=${handleFindBook()}`} >
                            <span>Quero ler!</span>
                            <img src={ArrowBlack} alt="" />
                        </a>

                        <div className='rating-book'>
                            <ModalRate title='Avalie a obra' />
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
                                <span>3 comentários</span>
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