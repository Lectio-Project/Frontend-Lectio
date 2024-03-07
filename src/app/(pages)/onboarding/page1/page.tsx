'use client'
import Button from '@/app/components/Button/Button';
import Logo from '../../../assets/logoLectio.svg';
import OnBoardingImg from '../../../assets/onBoardingImage.svg';
import './page1.css'
import { useRouter } from 'next/navigation';

export default function Page1(){

    const router = useRouter();

    return (
        <main>
            <header>
                <div className='logo-container'>
                    <img src={Logo} alt='Logo Lectio'/>
                </div>
            </header>

            <section className='container-text'>
                <div className='text-area'>
                <h3>Queremos te <br/> conhecer melhor!</h3>
                <span>Ajude-nos a compreender melhor o <br/> seu perfil em apenas três etapas. </span>
                <p>
                Quando você dá a sua opinião, a gente <br/> 
                consegue te oferecer uma experiência mais <br/>
                personalizada e aprimorada a cada vez que <br/> 
                você usa o aplicativo.
                </p>

                </div>

                <Button 
                className='primary' 
                type='button' 
                title='Começar' 
                onClick={()=>router.replace('/onboarding/page2')}/>

            </section>

            <div className='container-image'>
                <img src={OnBoardingImg} alt='Imagem Ilustrativa'/>
            </div>

            <p>Copyright 2022. Todos os direitos reservados.</p>
        </main>
    )
}