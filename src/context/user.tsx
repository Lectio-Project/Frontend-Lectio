'use client'

import { BookProps } from '@/types/book';
import { Onboarding } from '@/types/onboarding-types';
import { ReactNode, createContext, useContext, useState } from 'react';


interface User {
    id: string;
    name: string;
    email: string;
    username?: string;
    bio?: string;
    imageUrl?: string;
    token?: string;
    createdAt?: string,
    updatedAt?: string
}

type IUserContextData = {
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
    showModalEditPass: boolean;
    setShowModalEditPass: React.Dispatch<React.SetStateAction<boolean>>;
    showModalImage: boolean;
    setShowModalImage: React.Dispatch<React.SetStateAction<boolean>>;
    selectedImageUrl: string;
    setSelectedImageUrl: React.Dispatch<React.SetStateAction<string>>;
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    onboarding: Onboarding,
    setOnboarding: React.Dispatch<React.SetStateAction<Onboarding>>;
    bookId: string;
    setBookId: React.Dispatch<React.SetStateAction<string>>;
    authorId: string;
    setAuthorId: React.Dispatch<React.SetStateAction<string>>;
    rateValue: number;
    setRateValue: React.Dispatch<React.SetStateAction<number>>;
    booksSelected: BookProps[];
    setBooksSelected: React.Dispatch<React.SetStateAction<BookProps[]>>;
    titleSelected: string;
    setTitleSelected: React.Dispatch<React.SetStateAction<string>>;
}

interface AppProviderProps {
    children: ReactNode;
}

const DataContext = createContext<IUserContextData | undefined>(undefined);

const DataProvider: React.FC<AppProviderProps> = ({ children }: AppProviderProps) => {
    
    const [userData, setUserData] = useState<User>({ 
        name: '', 
        email: '',
        username:'', 
        bio:'' , 
        id: '', 
        token: '', 
        imageUrl: '',
        createdAt: '',
        updatedAt: ''

    });

    const [showModalEditPass, setShowModalEditPass] = useState<boolean>(false);
    const [showModalImage, setShowModalImage] = useState<boolean>(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState(userData.imageUrl || '');
    const [openDrawer, setOpenDrawer]= useState(false);
    const [onboarding, setOnboarding] = useState<Onboarding>({
        genresId: [],
        authorsId: [],
        booksId: []
    });
    const [bookId, setBookId] = useState<string>('');
    const [authorId, setAuthorId] = useState<string>('');
    const [rateValue, setRateValue] = useState<number>(0);

    const [booksSelected, setBooksSelected] = useState<BookProps[]>([])

    const [titleSelected, setTitleSelected] = useState('')

    const contextValue = {
        userData,
        setUserData,
        showModalEditPass,
        setShowModalEditPass,
        showModalImage,
        setShowModalImage,
        selectedImageUrl,
        setSelectedImageUrl,
        openDrawer,
        setOpenDrawer,
        onboarding,
        setOnboarding,
        bookId,
        setBookId,
        authorId,
        setAuthorId,
        rateValue,
        setRateValue,
        booksSelected,
        setBooksSelected,
        titleSelected,
        setTitleSelected
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext deve ser usado dentro de um ClientesProvider');
    }
    return context;
};

export { DataProvider, useDataContext };