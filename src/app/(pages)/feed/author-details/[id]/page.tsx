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

type AuthorDetailsProps = {
    params: {id: string};
};

export default function AutorDetails({params}: AuthorDetailsProps){
    const routeId = params.id;

    // {
    //     "id": "6051a5fe4a3d7e126c9d24b3",
    //     "name": "Ariano Suassuna",
    //     "imageUrl": "https://lectio.s3.us-east-005.backblazeb2.com/authors/ariano-suassuna.jpg",
    //     "birthplace": "Nossa Senhora das Neves (atualmente João Pessoa), Paraíba, Brasil",
    //     "carrerDescription": "Ariano Suassuna foi um renomado escritor, dramaturgo e poeta brasileiro, considerado um dos maiores representantes da cultura nordestina. Sua obra é marcada por uma profunda ligação com as tradições populares e folclóricas do Nordeste, retratando com humor e sensibilidade a vida e os costumes da região. Além de sua contribuição para a literatura, Suassuna também teve papel fundamental no desenvolvimento do teatro brasileiro.",
    //     "createdAt": "2024-03-21T18:14:46.677Z",
    //     "updatedAt": "2024-03-21T18:14:46.677Z"
    //   }

        const { setOpenDrawer, authorId, setAuthorId } = useDataContext();

        interface AuthorProps {
            id: string;
            name: string;
            imageUrl: string
            birthplace: string;
            carrerDescription: string;
            AuthorBook: { book: { id: string; name: string; imageUrl: string, avgGrade: number } }[];
        }

        const [authorData, setAuthorData]= useState<AuthorProps>({
            id:'',
            name:'',
            imageUrl:'',
            birthplace:'', 
            carrerDescription:'',
            AuthorBook: [{ book: {id: '', name: '', imageUrl: '', avgGrade: 0}}]
        })

        async function handleBookData(){
            
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

        useEffect(()=>{
            handleBookData();
        },[])
        
        console.log(authorData.AuthorBook[0].book.avgGrade);
    return(
        <main className='container-autor'>  

        <Header search='able' select='feed' />

            <section className='content-container'>

                <section className='image-autor'>
                    <img src={authorData.imageUrl} alt='foto do autor'/>
                </section>

                <section className='infos'>
                    <div className='infos-autor'>
                        <span>{authorData.name}</span>
                        <RatingStars size='medium' starsValues={authorData.AuthorBook[0].book.avgGrade}/>
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
                componente
            </section>

            <ButtonViewMore 
                className='btn-view-more'
                type='button'
                title='Ver mais livros do autor(a)'
            />

        </main>
    )
}