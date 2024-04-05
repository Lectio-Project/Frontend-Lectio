'use client'

import Logo from '../../assets/logoWithName.svg';
import Search from '../../assets/search.svg'
import MenuIcon from '../../assets/menuIcon.svg';
import NavBar from '@/app/components/NavBar/navBar';

import { useDataContext } from '@/context/user';
import { useRouter } from "next/navigation";

import './Header.css';
import HamburguerMenu from '../hamburguerMenu/hamburguerMenu';

interface HeaderProps {
    search: 'able' | 'disabled';
    select: 'home' | 'feed' | 'perfil' | 'none';
}

export default function Header({ search, select }: HeaderProps) {
    const { setOpenDrawer } = useDataContext();
    const router = useRouter();

    return (
        <header className='header-container'>
            <div className='logo-section'>
                <img src={Logo} alt='logo Icon' onClick={() => router.push('/home')}/>
            </div>

            <div className={search === 'able' ? 'header-search' : 'header-search-disabled'}>
                <img src={Search} alt="search image" />
                <input type='search' placeholder='Pesquisar'></input>
            </div>

            <div className='sandwich-menu'>
                <img src={Search} alt="search image" className='search-button-header' onClick={() => router.push('/search')}/>
                <img src={MenuIcon} alt='sandwich menu' onClick={()=> setOpenDrawer(true)}/>
            </div>

            <nav>
                <NavBar select={select} />
            </nav>

            <HamburguerMenu select={select} />
        </header>
    )
}