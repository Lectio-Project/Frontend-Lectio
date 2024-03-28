'use client'
import ButtonViewMore from '@/app/components/ButtonViewMore/ButtonViewMore';
import Logo from '../../assets/logoWithName.svg';
import MenuIcon from '../../assets/menuIcon.svg';

import NavBar from "@/app/components/NavBar/navBar";

import { useDataContext } from "@/context/user";
import { useRouter } from "next/navigation";
import HamburguerMenu from '@/app/components/hamburguerMenu/hamburguerMenu';

import './autor.css'
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { getCookie } from '@/utils/cookies';


export default function AutorDetails(){

    // {
    //     "id": "6051a5fe4a3d7e126c9d24b3",
    //     "name": "Ariano Suassuna",
    //     "imageUrl": "https://lectio.s3.us-east-005.backblazeb2.com/authors/ariano-suassuna.jpg",
    //     "birthplace": "Nossa Senhora das Neves (atualmente João Pessoa), Paraíba, Brasil",
    //     "carrerDescription": "Ariano Suassuna foi um renomado escritor, dramaturgo e poeta brasileiro, considerado um dos maiores representantes da cultura nordestina. Sua obra é marcada por uma profunda ligação com as tradições populares e folclóricas do Nordeste, retratando com humor e sensibilidade a vida e os costumes da região. Além de sua contribuição para a literatura, Suassuna também teve papel fundamental no desenvolvimento do teatro brasileiro.",
    //     "createdAt": "2024-03-21T18:14:46.677Z",
    //     "updatedAt": "2024-03-21T18:14:46.677Z"
    //   }

        const { 
            userData,
            setUserData,
            showModalEditPass, 
            setShowModalEditPass, 
            showModalImage, 
            setShowModalImage,
            selectedImageUrl,
            openDrawer, 
            setOpenDrawer,
            idManage,
            setIdManage
        } = useDataContext();

        const [autorData, setAutorData]= useState({
            id:'',
            name:'',
            imageUrl:'',
            birthplace:'', 
            carrerDescription:''
        })
        
        const router= useRouter();
        const token = getCookie('token');
        
        interface Data {
            id: string;
        }

        async function handleBookData(){
            
            try {
                const token = await getCookie('token');
                const response = await api.get(`/authors/${idManage}`,
            {
                headers: {
                authorization: `Bearer ${token}` ,
                },
            }
            )
            setAutorData(response.data);

            } catch (error) {

                console.log(error)
            }
        }

        useEffect(()=>{
            handleBookData();
        },[])

    return(
        <main className='container-autor'>  

        <header className='header-container'>

            <div className='logo-section'>
            <img src={Logo} alt='logo Icon'/>
            </div>

            <div className='sandwich-menu' onClick={()=> setOpenDrawer(true)}>
                <img src={MenuIcon} alt='sandwich menu' />
            </div>

            <nav>
                <NavBar select='feed'/>
            </nav>

            </header>

            <HamburguerMenu select= 'feed'/>

            <section className='content-container'>

                <section className='image-autor'>
                    <img src={autorData.imageUrl} alt='foto do autor'/>
                </section>

                <section className='infos'>

                    <div className='infos-autor'>
                        <span>{autorData.name}</span>
                        <p>rating</p>
                    </div>

                    <p>{autorData.carrerDescription}</p>
                    
                    <section className='local-rate-area'>

                        <div className='local-text'>
                            <span>Nasceu em:<p>{autorData.birthplace}</p></span>
                        </div>

                        <div className='rating-area'>
                            rating
                            <a>Avalie o autor(a)</a>
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