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
    const [booksAuthor, setBooksAuthor] = useState<Book[]>([]);
    const isTablet = useMediaQuery('(min-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1280px)');

    interface AuthorProps {
        id: string;
        name: string;
        imageUrl: string
        birthplace: string;
        carrerDescription: string;
        totalGrade: number;
        avgGrade: number;
        AuthorBook: { book: { id: string; name: string; imageUrl: string, avgGrade: number } }[];
    }

    const [authorData, setAuthorData]= useState<AuthorProps>({
        id:'',
        name:'',
        imageUrl:'',
        birthplace:'', 
        carrerDescription:'',
        totalGrade: 0,
        avgGrade: 0,
        AuthorBook: [{ book: {id: '', name: '', imageUrl: '', avgGrade: 0}}]
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
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        handleAuthorData();
    },[])

    useEffect(()=>{
        if (authorData.id !== "") {
            for (const item of authorData.AuthorBook) {
                setBooksAuthor([item.book]);
            }
        }
    }, [authorData])
    
    console.log(booksAuthor);
    
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
                            <RatingStars size='medium' starsValues={authorData.avgGrade} authorValue={authorData.totalGrade} readOnly />
                        </div>

                        <p>{authorData.carrerDescription}</p>
                        
                        <section className='local-rate-area'>

                            <div className='local-text'>
                                <span>Nasceu em:<p>{authorData.birthplace}</p></span>
                            </div>

                            <div className='rating-area'>
                                <ModalRate title='Avalie o autor(a)'/>
                            </div>

                        </section>

                    </section>
                </section> 

                <section className='books-indication'>
                    <span>Livros em Destaque</span>
                    {/* {booksAuthor && <ContainerBookHome books={booksAuthor} isTablet={isTablet} isDesktop={isDesktop} />} */}
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