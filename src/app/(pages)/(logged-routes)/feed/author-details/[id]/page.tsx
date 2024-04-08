'use client';

import api from '@/api/api';
import ContainerBookHome from '@/app/components/ContainerBookHome/ContainerBookHome';
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/loading';
import ModalRate from '@/app/components/ModalRate/ModalRate';
import RatingStars from '@/app/components/RatingStars/RatingStars';
import { useDataContext } from '@/context/user';
import { AuthorBookProps, AuthorProps } from '@/types/author';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './author-details.css';

type AuthorDetailsProps = {
    params: { id: string };
};

export default function AuthorDetails({ params }: AuthorDetailsProps) {
    const routeId = params.id;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [addComment, setAddComment] = useState<number>(0);
    const [booksAuthor, setBooksAuthor] = useState([]);

    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)');

    const router = useRouter();

    const [authorData, setAuthorData] = useState<AuthorProps | null>(null);
    const { userData } = useDataContext();

    async function handleAuthorData() {
        try {
            const response = await api.get(`/authors/${routeId}?add=book`, {
                headers: {
                    authorization: `Bearer ${userData.token}`
                }
            });

            const booksAuthorMap = response.data.AuthorBook.map(
                (book: AuthorBookProps) => {
                    return book.book;
                }
            );

            setAuthorData(response.data);
            setBooksAuthor(booksAuthorMap);
        } catch (error) {
            return router.replace('/home');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleAuthorData();
    }, [addComment]);

    return (
        <main className="container-author">
            <Header search="able" select="feed" />

            {isLoading || !authorData ? (
                <div className="container-book-loading">
                    <Loading />
                </div>
            ) : (
                <div>
                    <section className="content-container-author">
                        <section className="image-author">
                            <img
                                src={authorData.imageUrl}
                                alt="foto do autor"
                            />
                        </section>

                        <section className="infos">
                            <div className="infos-author">
                                <h3 className="infos-author-name">
                                    {authorData.name}
                                </h3>
                                <RatingStars
                                    size={isDesktop ? 'large' : 'medium'}
                                    starsValues={authorData.avgGrade}
                                    authorValue={authorData.counterGrade}
                                    bookValue={
                                        isDesktop
                                            ? authorData.avgGrade
                                            : undefined
                                    }
                                    readOnly
                                />
                            </div>

                            <p>{authorData.carrerDescription}</p>

                            <section className="local-rate-area">
                                <div className="local-text">
                                    <p>
                                        Nasceu em:{' '}
                                        <span>{authorData.birthplace}</span>
                                    </p>
                                </div>

                                <div className="rating-area">
                                    <ModalRate
                                        title="Avalie o autor(a)"
                                        authorId={routeId}
                                        addComment={addComment}
                                        setAddComment={setAddComment}
                                        requisition="author"
                                    />
                                </div>
                            </section>
                        </section>
                    </section>

                    <section className="books-indication">
                        <h2>Livros de {authorData.name}</h2>

                        <ContainerBookHome
                            books={booksAuthor}
                            isDesktop={isDesktop}
                            isTablet={isTablet}
                        />
                    </section>

                    {/* <div className='btn-area'>
                    <ButtonViewMore 
                        className='btn-view-more'
                        type='button'
                        title='Ver mais livros do autor(a)'
                    /> 
                </div> */}
                </div>
            )}
        </main>
    );
}
