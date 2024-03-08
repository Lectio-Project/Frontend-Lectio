'use client'

import LogoWithName from '@/app/assets/logoWithName.svg';

import ButtonGender from '@/app/components/ButtonGender/ButtonGender';
import Button from '@/app/components/Button/Button';
import { listGender } from '@/app/data/gender';

import './page2.css';

export default function Page2() {
    function handleChangeClassName(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.classList.value === 'button-default-gender') {
            e.currentTarget.classList.replace('button-default-gender', 'button-selected-gender');
        } else {
            e.currentTarget.classList.replace('button-selected-gender', 'button-default-gender');
        }
    }

    return (
        <main className='gender-container'>
            <header><img src={LogoWithName} alt="Logo Lectio and name" className='gender-logo-with-name'/></header>

            <div className='onboarding-step'>
                <span>1/3</span>
            </div>

            <h2 className='gender-title'>Escolha 3 gêneros que você gosta</h2>

            <section className='gender-buttons'>
                {listGender.map((nameGender, key) => {
                    return (
                        <ButtonGender 
                            key={key} 
                            title={nameGender} 
                            className="button-default-gender" 
                            onClick={handleChangeClassName} 
                        />
                    );
                })}
            </section>

            <div className='gender-button-action'>
                <Button className='secondary' title='Pular' type='button'/>
                <Button className='primary' title='Continuar' type='submit'/>
            </div>
        </main>
    )
}