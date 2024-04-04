'use client'
import LogoWithName from '@/app/assets/logoWithName.svg';
import ImageBookReader from '@/app/assets/bookReaderInitial.svg'

import Button from "@/app/components/Button/Button";

import { useRouter } from 'next/navigation';

import './initial.css';

export default function Initial() {
    const router = useRouter()

    return (
        <main className='initial-container'>
            <header><img src={LogoWithName} alt="Logo Lectio and name" className='initial-logo-with-name'/></header>
            <section className='initial-content'>
                <section className='initial-left-side'>
                    <h2 className='initial-title'>Descubra o melhor</h2>
                    <h2 className='initial-title-highlighted'>da literatura brasileira</h2>
                    <p className='initial-text'>Descubra a riqueza da literatura nacional no Lectio, um site dedicado à promoção de autores brasileiros. Explore análises envolventes, resenhas e descubra novos talentos que contribuem para o cenário literário do Brasil.</p>
                    <div className='initial-container-btns'>
                        <Button title='Fazer Login' type='button' className='primary' onClick={() => router.push('/signin')}/>
                        <Button title='Cadastrar-se' type='button' className='secondary' onClick={() => router.push('/signup')}/>
                    </div>
                </section>
                <img src={ImageBookReader} alt="" className='initial-book-reader' />
            </section>

            <section className="footer">
                <span>Copyright 2022. Todos os direitos reservados.</span>
            </section>
        </main>
    )
}