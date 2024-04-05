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
import { Rating, useMediaQuery } from '@mui/material';
import ContainerBookHome from '@/app/components/ContainerBookHome/ContainerBookHome';
import { Book } from '@/types/home-types';
import Loading from '@/app/components/Loading/loading';

type AuthorDetailsProps = {
    params: {id: string};
};

export default function AutorDetails({params}: AuthorDetailsProps){
    const routeId = params.id;
    const { setOpenDrawer, authorId, setAuthorId } = useDataContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [addComment, setAddComment] = useState<number>(0);
    const [booksAuthor, setBooksAuthor] = useState<Book[]>([]);
    const [booksFilterAuthor, setBooksFilterAuthor] = useState<Book[]>([]);
    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)');

    interface AuthorProps {
        id: string;
        name: string;
        imageUrl: string
        birthplace: string;
        carrerDescription: string;
        counterGrade: number;
        totalGrade: number;
        avgGrade: number;
        AuthorBook?: { book: { id: string; name: string; imageUrl: string, avgGrade: number } }[];
    }

    const [authorData, setAuthorData]= useState<AuthorProps>({
        id:'',
        name:'',
        imageUrl:'',
        birthplace:'', 
        carrerDescription:'',
        counterGrade: 0,
        totalGrade: 0,
        avgGrade: 0,
    })
    
    async function handleAuthorData(){     
        try {
            const token = await getCookie('token');
            const response = await api.get(`/authors/${routeId}?add=book`, {
                headers: {
                authorization: `Bearer ${token}`,
            },
        })

        setAuthorData(response.data);

        } catch (error) {
            console.error(error)
        } 
    }

    async function handleBookAuthorData() {
        try {
            const token = await getCookie('token');
            const response = await api.get(`/books`, {
                headers: {
                authorization: `Bearer ${token}`,
            },
        })

        setBooksAuthor(response.data);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    function handleUpdateBooks() {
        if (booksAuthor.length) {
            for (const item of booksAuthor) {
                if (item.AuthorBook[0].author.name === authorData.name) {
                    setBooksFilterAuthor([item])
                }
            }
        }
    }
    useEffect(()=>{
        handleAuthorData();
        handleBookAuthorData();
        handleUpdateBooks();
        
    }, [])

    console.log(booksAuthor);
    console.log(booksFilterAuthor);
    
    return(
        <main className='container-author'>  

        <Header search='able' select='feed' />

        {isLoading ? (
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
                            <RatingStars size={isDesktop ? 'large' : 'medium'} starsValues={authorData.avgGrade} authorValue={authorData.totalGrade} bookValue={isDesktop ? authorData.avgGrade : undefined} readOnly />
                        </div>

                        <p>{authorData.carrerDescription}</p>
                        
                        <section className='local-rate-area'>

                            <div className='local-text'>
                                <span>Nasceu em:<p>{authorData.birthplace}</p></span>
                            </div>

                            <div className='rating-area'>
                                <ModalRate title='Avalie o autor(a)' bookId={routeId} addComment={addComment} setAddComment={setAddComment} />
                            </div>

                        </section>

                    </section>
                </section> 

                <section className='books-indication'>
                    <span>Livros em Destaque</span>

                    <section className='container-books-section-home'>
                        {/* {booksFilterAuthor && <ContainerBookHome books={booksAuthor} isTablet={isTablet} isDesktop={isDesktop} />} */}
                    </section>
                </section>


                <div className='btn-area'>
                    <ButtonViewMore 
                        className='btn-view-more'
                        type='button'
                        title='Ver mais livros do autor(a)'
                    /> 
                </div>

            </div>
            )}

        </main>
    )
}