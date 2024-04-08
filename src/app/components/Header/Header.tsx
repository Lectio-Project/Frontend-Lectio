'use client';

import NavBar from '@/app/components/NavBar/navBar';
import Logo from '../../assets/logoWithName.svg';
import MenuIcon from '../../assets/menuIcon.svg';
import Search from '../../assets/search.svg';
import HamburguerMenu from '../hamburguerMenu/hamburguerMenu';

import { useDataContext } from '@/context/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ModalGenresSelection from '../ModalGenresSelection/ModalGenresSelection';
import './Header.css';

interface HeaderProps {
    search: 'able' | 'disabled';
    select: 'home' | 'feed' | 'perfil' | 'none';
    page?: string;
}

export default function Header({ search, select, page }: HeaderProps) {
    const { setOpenDrawer } = useDataContext();
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [showModalGenres, setShowModalGenres] = useState(false);

    return (
        <header className="header-container">
            <div className="logo-section">
                <img
                    src={Logo}
                    alt="logo Icon"
                    onClick={() => router.push('/home')}
                />
            </div>

            <div
                className={`${
                    search === 'able' && page !== 'search'
                        ? 'header-search'
                        : page !== 'search'
                        ? 'header-search-disabled'
                        : ''
                } ${page === 'search' ? 'header-search-page' : ''}`}
            >
                <input
                    type="search"
                    placeholder="Pesquisar"
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchText) {
                            router.push(`/search/result/${searchText}`);
                        }
                    }}
                    onClick={() =>
                        page !== 'search' &&
                        setShowModalGenres(!showModalGenres)
                    }
                />
                <img
                    src={Search}
                    alt="search image"
                    onClick={() =>
                        searchText &&
                        router.push(`/search/result/${searchText}`)
                    }
                />
                {showModalGenres && <ModalGenresSelection />}
            </div>

            <div className="sandwich-menu">
                <img
                    src={Search}
                    alt="search image"
                    className="search-button-header"
                    onClick={() => router.push('/search')}
                />
                <img
                    src={MenuIcon}
                    alt="sandwich menu"
                    className="sandwich-button-header"
                    onClick={() => setOpenDrawer(true)}
                />
            </div>

            <nav>
                <NavBar select={select} />
            </nav>

            <HamburguerMenu select={select} />
        </header>
    );
}
