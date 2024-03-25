'use client'
import ButtonViewMore from '@/app/components/ButtonViewMore/ButtonViewMore';
import Logo from '../../assets/logoWithName.svg';
import MenuIcon from '../../assets/menuIcon.svg';

import NavBar from "@/app/components/NavBar/navBar";

import { useDataContext } from "@/context/user";
import { useRouter } from "next/navigation";
import HamburguerMenu from '@/app/components/hamburguerMenu/hamburguerMenu';

import './autor.css'


export default function AutorDetails(){

        const { 
            userData,
            setUserData,
            showModalEditPass, 
            setShowModalEditPass, 
            showModalImage, 
            setShowModalImage,
            selectedImageUrl,
            openDrawer, 
            setOpenDrawer
        } = useDataContext();
        
        const router= useRouter();

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
                <NavBar select='perfil'/>
            </nav>

            </header>

            <HamburguerMenu select= 'feed'/>

            <section className='image-autor'>
                <img src={'algo'} alt='foto do autor'/>
            </section>

            <section className='infos'>

                <div className='infos-autor'>
                    <span>Conceição Evaristo</span>
                    <p>rating</p>
                </div>

                <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, architecto cumque? Voluptatum accusantium error cupiditate, optio consequuntur nobis? Labore quas natus ipsum nisi molestiae laborum velit facilis repudiandae, alias eligendi? Fuga animi nobis reprehenderit aliquam voluptatem consectetur minima aliquid hic optio quae dolorem ullam neque, voluptatibus itaque dignissimos repellat eius? </p>
                
                <section className='local-rate-area'>

                    <div className='local-text'>
                        <span>Nasceu em:<p>Local</p></span>
                    </div>

                    <div className='rating-area'>
                        rating
                        <a>Avalie o autor(a)</a>
                    </div>

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