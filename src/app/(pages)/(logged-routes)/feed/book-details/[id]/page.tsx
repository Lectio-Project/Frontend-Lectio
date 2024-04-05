'use client';

import ArrowGray from '../../../../../assets/arrowBottom.svg';
import ArrowBlack from '../../../../../assets/arrowButton.svg';
import ArrowYellow from '../../../../../assets/arrowGoYellow.svg';

import ButtonViewMore from '@/app/components/ButtonViewMore/ButtonViewMore';
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/loading';
import ModalRate from '@/app/components/ModalRate/ModalRate';
import RatingStars from '@/app/components/RatingStars/RatingStars';

import api from '@/api/api';
import { getCookie } from '@/utils/cookies';
import { useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SyntheticEvent, useEffect, useState } from 'react';

import { useDataContext } from '@/context/user';
import './book-details.css';

type BookDetailsProps = {
    params: { id: string };
};

export default function BookDetails({ params }: BookDetailsProps) {
    const [bookData, setBookData] = useState<BookProps>({
        name: '',
        publishYear: '',
        publishingCompany: '',
        synopsis: '',
        imageUrl: '',
        avgGrade: 0,
        counterGrade: 0,
        totalPages: '',
        totalGrade: 0,
        isbn13: '',
        gender: { id: '', gender: '' },
        AuthorBook: [{ author: { id: '', name: '', imageUrl: '' } }],
        LiteraryAwards: [{ id: '', name: '', year: '' }],
        Comment: [
            {
                id: '',
                bookGrade: 0,
                text: '',
                createdAt: '',
                updatedAt: '',
                user: { id: '', name: '', imageUrl: '' }
            }
        ]
    });

    const [booksAuthorData, setBooksAuthorData] = useState([]);
    const [commentWithText, setCommentWithText] = useState<CommentProps[]>([]);
    const [addComment, setAddComment] = useState<number>(0);
    const [showDescription, setShowDescription] = useState(false);
    const [showInfoTechnical, setShowInfoTechnical] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isTablet = useMediaQuery(
        '(min-width: 768px) and (max-width: 1023px)'
    );
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const routeId = params.id;
    const { bookId } = useDataContext();
    const initialImage =
        'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

    interface CommentProps {
        id: string;
        bookGrade: number;
        text: string;
        createdAt: string;
        updatedAt: string;
        user: { id: string; name: string; imageUrl: string };
    }

    interface BookProps {
        name: string;
        publishYear: string;
        publishingCompany: string;
        synopsis: string;
        imageUrl: string;
        totalGrade: number;
        avgGrade: number;
        counterGrade: number;
        totalPages: string;
        isbn13: string;
        gender: { id: string; gender: string };
        AuthorBook: {
            author: { id: string; name: string; imageUrl: string };
        }[];
        LiteraryAwards?: { id: string; name: string; year: string }[];
        Comment: CommentProps[];
    }

    useEffect(() => {
        handleBookData();
    }, [addComment]);

    useEffect(() => {
        if (bookData.AuthorBook[0].author.id) {
            handleBooksAuthor();
        }
    }, [bookData.AuthorBook[0].author.id]);

    async function handleBookData() {
        try {
            const token = await getCookie('token');
            const response = await api.get(`/books/${routeId}?add=comment`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            setBookData(response.data);

            const commentText = response.data.Comment.filter(
                (comment: CommentProps) => comment.text
            );

            setCommentWithText(commentText);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleBooksAuthor() {
        try {
            const token = await getCookie('token');
            const response = await api.get(
                `/authors/${bookData.AuthorBook[0].author.id}?add=book`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            setBooksAuthorData(response.data);
        } catch (error: any) {
            console.error(error);
        }
    }

    function handleFindBook() {
        const bookName = bookData?.name;
        return bookName.replaceAll(' ', '+');
    }

    interface ImageErrorEvent extends SyntheticEvent<HTMLImageElement, Event> {
        target: EventTarget & {
            src: string;
        };
    }

    function handleImageError(event: ImageErrorEvent) {
        event.target.src = initialImage;
    }

    return isLoading ? (
        <div className="container-book-loading">
            <Loading />
        </div>
    ) : (
        !isLoading && (
            <section className="container-book">
                <Header search="able" select="feed" />

                <main className="content-container-book">
                    <div className="book-info-reduced">
                        <div className="book-title-author-mobile">
                            <h3 className="book-title">{bookData.name}</h3>
                            <span className="book-author">
                                por{' '}
                                <span>
                                    {bookData.AuthorBook[0].author.name}
                                </span>
                            </span>
                        </div>

                        <img src={bookData.imageUrl} className="book-image" />

                        <div className="local-genres-area-mobile">
                            <span className="genre-title">Gênero</span>
                            <span className="genre-book">
                                {bookData.gender.gender}
                            </span>
                        </div>

                        <div className="book-review-mobile">
                            <div className="note-book">
                                <RatingStars
                                    starsValues={bookData.avgGrade}
                                    size="medium"
                                    readOnly
                                    bookValue={bookData.avgGrade}
                                />
                            </div>

                            <div className="assessments-and-reviews">
                                <span>{bookData.counterGrade} avaliações</span>
                                <span>·</span>
                                <span>
                                    {commentWithText.length} comentários
                                </span>
                            </div>
                        </div>

                        <a
                            className="button-book"
                            href={`https://www.amazon.com.br/s?k=${handleFindBook()}`}
                        >
                            <span>Quero ler!</span>
                            <img src={ArrowBlack} alt="" />
                        </a>

                        <div className="rating-book">
                            <ModalRate
                                title="Avalie a obra"
                                bookId={routeId}
                                addComment={addComment}
                                setAddComment={setAddComment}
                            />
                        </div>
                    </div>

                    <div className="book-info-large">
                        <div className="book-title-author-desktop">
                            <h3 className="book-title">{bookData.name}</h3>
                            <span className="book-author">
                                por{' '}
                                <span>
                                    {bookData.AuthorBook[0].author.name}
                                </span>
                            </span>
                        </div>

                        <div className="book-review-desktop">
                            <div className="note-book">
                                <RatingStars
                                    starsValues={bookData.avgGrade}
                                    size={isTablet ? 'medium' : 'large'}
                                    readOnly
                                    bookValue={bookData.avgGrade}
                                />
                            </div>

                            <div className="assessments-and-reviews">
                                <span>{bookData.totalGrade} avaliações</span>
                                <span>·</span>
                                <span>
                                    {bookData.Comment.length} comentários
                                </span>
                            </div>
                        </div>

                        <div className="local-genres-area-desktop">
                            <span className="genre-title">Gênero</span>
                            <span className="genre-book">
                                {bookData.gender.gender}
                            </span>
                        </div>

                        <div
                            className={
                                showDescription
                                    ? 'book-description-open'
                                    : 'book-description'
                            }
                        >
                            <p className="book-description-text">
                                {bookData.synopsis}
                            </p>
                        </div>

                        <div
                            className="book-description-button"
                            onClick={() => setShowDescription(!showDescription)}
                        >
                            <span>
                                {showDescription ? 'Minimizar' : 'Saiba mais'}
                            </span>
                            <img
                                className={
                                    showDescription
                                        ? 'arrow-top-button'
                                        : 'arrow-bottom-button'
                                }
                                src={ArrowYellow}
                                alt=""
                            />
                        </div>

                        <button
                            className={
                                showInfoTechnical
                                    ? 'button-informations-open'
                                    : 'button-informations-close'
                            }
                        >
                            <div
                                className="button-informations-top"
                                onClick={() => setShowInfoTechnical(true)}
                            >
                                <strong>Informações técnicas</strong>
                                <img
                                    src={ArrowGray}
                                    alt="ícone para expandir o botão"
                                    className={
                                        showInfoTechnical
                                            ? 'button-informations-arrowTop'
                                            : 'button-informations-arrowBottom'
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowInfoTechnical(
                                            !showInfoTechnical
                                        );
                                    }}
                                />
                            </div>

                            {showInfoTechnical && (
                                <section className="button-informations">
                                    <div className="button-informations-info">
                                        <h3>Ano de publicação</h3>
                                        <h3>Editora</h3>
                                        <h3>Prêmios literários</h3>
                                        <h3>Número de páginas</h3>
                                        <h3>ISBN</h3>
                                    </div>

                                    <div className="button-informations-info">
                                        <p>{bookData.publishYear}</p>
                                        <p>{bookData.publishingCompany}</p>
                                        <p>
                                            {bookData.LiteraryAwards?.length
                                                ? `Prêmio ${bookData.LiteraryAwards[0].name} (${bookData.LiteraryAwards[0].year})`
                                                : 'Nenhum'}
                                        </p>
                                        <p>{bookData.totalPages}</p>
                                        <p>
                                            9788533307391, 9788534705974, &
                                            9788534705257.
                                        </p>
                                    </div>
                                </section>
                            )}
                        </button>

                        <section className="container-comments">
                            <h3 className="comments-title">Comentários</h3>
                            <span className="comments-published">
                                {commentWithText.length} comentários publicados
                            </span>

                            <section className="comments">
                                {commentWithText
                                    .slice(0, 3)
                                    .map((userComment) => {
                                        const formatedDate = format(
                                            new Date(userComment.createdAt),
                                            "dd 'de' MMMM 'às' HH:mm",
                                            { locale: ptBR }
                                        );
                                        if (userComment.text) {
                                            return (
                                                <article
                                                    className="comment-user"
                                                    key={userComment.id}
                                                >
                                                    <div className="comment-user-intern">
                                                        <img
                                                            src={
                                                                userComment.user
                                                                    .imageUrl ||
                                                                initialImage
                                                            }
                                                            alt=""
                                                            onError={
                                                                handleImageError
                                                            }
                                                        />

                                                        <div className="comment-user-info">
                                                            <div>
                                                                <strong className="comment-username">
                                                                    {
                                                                        userComment
                                                                            .user
                                                                            .name
                                                                    }
                                                                </strong>
                                                                <RatingStars
                                                                    starsValues={
                                                                        userComment.bookGrade
                                                                    }
                                                                    size="small"
                                                                    readOnly
                                                                />
                                                            </div>

                                                            <span className="comment-date">
                                                                postado em{' '}
                                                                {formatedDate}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <p>{userComment.text}</p>
                                                </article>
                                            );
                                        }
                                    })}
                            </section>

                            <ButtonViewMore
                                className="button-more-comments"
                                title="Ver mais comentários"
                                type="button"
                            />
                        </section>

                        <section className="more-books-author">
                            <h3>Você também pode se interessar...</h3>
                            <span>
                                Livros também escritos por{' '}
                                {bookData.AuthorBook[0].author.name}:
                            </span>
                        </section>

                        {/* <ContainerBookHome books={booksAuthorData} isTablet={isTablet} isDesktop={isDesktop} /> */}
                    </div>
                </main>
            </section>
        )
    );
}
