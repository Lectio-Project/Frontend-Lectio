'use client'
import ButtonViewMore from '@/app/components/ButtonViewMore/ButtonViewMore';
import { useDataContext } from "@/context/user";

import './author-details.css'
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { getCookie } from '@/utils/cookies';
import Header from '@/app/components/Header/Header';
import RatingStars from '@/app/components/RatingStars/RatingStars';
import ModalRate from '@/app/components/ModalRate/ModalRate';
import { useMediaQuery } from '@mui/material';
import ContainerBookHome from '@/app/components/ContainerBookHome/ContainerBookHome';
import Loading from '@/app/components/Loading/loading';
import { useRouter } from 'next/navigation';
import { BookProps } from '@/types/books';

type AuthorDetailsProps = {
    params: {id: string};
};

export interface AuthorProps {
    id: string;
    name: string;
    imageUrl: string
    birthplace: string;
    carrerDescription: string;
    counterGrade: number;
    totalGrade: number;
    avgGrade: number;
    AuthorBook?: AuthorBookProps[];
    Genders?: { gender: { id: string; gender: string } }[];
}

export interface AuthorBookProps {
    book: BookProps;
}

export default function AuthorDetails({params}: AuthorDetailsProps){
    const routeId = params.id;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [addComment, setAddComment] = useState<number>(0);
    const [booksAuthor, setBooksAuthor] = useState([]);

    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)');

    const router = useRouter();

    const [authorData, setAuthorData]= useState<AuthorProps | null>(null)
    
    async function handleAuthorData() {     
        try {
            const token = await getCookie('token');
            const response = await api.get(`/authors/${routeId}?add=book`, {
                headers: {
                authorization: `Bearer ${token}`,
            },
        })

        const booksAuthorMap = response.data.AuthorBook.map((book: AuthorBookProps) => {
            return book.book
        })

        setAuthorData(response.data);
        setBooksAuthor(booksAuthorMap);
        
        } catch (error) {
            return router.replace('/home')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleAuthorData();
    }, [addComment])
    
    return(
        <main className='container-author'>  

        <Header search='able' select='feed' />

        {isLoading || !authorData ? (
            <div className='container-book-loading'>
                <Loading />
            </div>
        ) : (
            <div>
                <section className='content-container-author'>

                    <section className='image-author'>
                        <img src={authorData.imageUrl} alt='foto do autor'/>
                    </section>

                    <section className='infos'>
                        <div className='infos-author'>
                            <h3 className='infos-author-name'>{authorData.name}</h3>
                            <RatingStars size={isDesktop ? 'large' : 'medium'} starsValues={authorData.avgGrade} authorValue={authorData.counterGrade} bookValue={isDesktop ? authorData.avgGrade : undefined} readOnly />
                        </div>

                        <p>{authorData.carrerDescription}</p>
                        
                        <section className='local-rate-area'>

                            <div className='local-text'>
                                <p>Nasceu em: <span>{authorData.birthplace}</span></p>
                            </div>

                            <div className='rating-area'>
                                <ModalRate title='Avalie o autor(a)' authorId={routeId} addComment={addComment} setAddComment={setAddComment} requisition='author' />
                            </div>

                        </section>

                    </section>
                </section> 

                <section className='books-indication'>
                    <span>Livros de {authorData.name}</span>
                    <ContainerBookHome books={booksAuthor} isDesktop={isDesktop} isTablet={isTablet} />

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
    )
}