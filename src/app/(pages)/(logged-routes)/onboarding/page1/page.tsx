'use client'
import Button from '@/app/components/Button/Button';
import Logo from '../../../../assets/logoWithName.svg';
import OnBoardingImg from '../../../../assets/onBoardingImage.svg';
import './page1.css'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page1(){
    const {data: session, update} = useSession();
    const router = useRouter();
    
    useEffect(() => {
        if (session?.checkOnBoarding) {
            window.location.reload();
        }
    }, [session?.checkOnBoarding])

    return (
        <main className='container-main'>
            <header>
                <div className='logo-container'>
                    <img src={Logo} alt='Logo Lectio'/>
                </div>
            </header>

            <div className='box-content'>
                
            <section className='container-text'>
                <div className='text-area'>
                <h3>Queremos te  conhecer melhor!</h3>
                <span>Ajude-nos a compreender melhor o 
                seu perfil em apenas três etapas. </span>
                <p>
                Quando você dá a sua opinião, a gente 
                consegue te oferecer uma experiência mais 
                personalizada e aprimorada a cada vez que 
                você usa o aplicativo.
                </p>

                </div>

                <Button 
                className='primary' 
                type='button' 
                title='Começar' 
                onClick={()=>router.push('/onboarding/page2')}/>

            </section>

            <div className='container-image'>
                <img src={OnBoardingImg} alt='Imagem Ilustrativa'/>
            </div>

            </div>
            <p className='copyright'>Copyright 2022. Todos os direitos reservados.</p>
        </main>
    )
}