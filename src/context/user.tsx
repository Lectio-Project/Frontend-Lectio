'use client';

import { AuthorProps } from '@/app/(pages)/(logged-routes)/feed/author-details/[id]/page';
import { BookProps } from '@/types/books';
import { Genre, Onboarding } from '@/types/onboarding-types';
import { ReactNode, createContext, useContext, useState } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    username?: string;
    bio?: string;
    imageUrl?: string;
    token?: string;
    createdAt?: string;
    updatedAt?: string;
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
    onboarding: Onboarding;
    setOnboarding: React.Dispatch<React.SetStateAction<Onboarding>>;
    bookId: string;
    setBookId: React.Dispatch<React.SetStateAction<string>>;
    authorId: string;
    setAuthorId: React.Dispatch<React.SetStateAction<string>>;
    rateValue: number;
    setRateValue: React.Dispatch<React.SetStateAction<number>>;
    onboardingGenders: Genre[] | null;
    setOnboardingGenders: React.Dispatch<React.SetStateAction<Genre[] | null>>;
    onboardingBooks: BookProps[] | null;
    setOnboardingBooks: React.Dispatch<React.SetStateAction<BookProps[] | null>>;
    onboardingAuthors: AuthorProps[] | null;
    setOnboardingAuthors: React.Dispatch<React.SetStateAction<AuthorProps[] | null>>;
};

interface AppProviderProps {
    children: ReactNode;
    sessionUser: User;
}

const DataContext = createContext<IUserContextData | undefined>(undefined);

const DataProvider: React.FC<AppProviderProps> = ({
    children,
    sessionUser
}: AppProviderProps) => {
    const [userData, setUserData] = useState<User>(sessionUser);

    const [showModalEditPass, setShowModalEditPass] = useState<boolean>(false);
    const [showModalImage, setShowModalImage] = useState<boolean>(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState(
        userData?.imageUrl || ''
    );
    const [openDrawer, setOpenDrawer] = useState(false);
    const [onboarding, setOnboarding] = useState<Onboarding>({
        genresId: [],
        authorsId: [],
        booksId: []
    });
    const [bookId, setBookId] = useState<string>('');
    const [authorId, setAuthorId] = useState<string>('');
    const [rateValue, setRateValue] = useState<number>(0);
    const [onboardingGenders, setOnboardingGenders] = useState<Genre[] | null>(null);
    const [onboardingAuthors, setOnboardingAuthors] = useState<AuthorProps[] | null>(null);
    const [onboardingBooks, setOnboardingBooks] = useState<BookProps[] | null>(null);

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
        onboardingGenders,
        setOnboardingGenders,
        onboardingAuthors,
        setOnboardingAuthors,
        onboardingBooks,
        setOnboardingBooks
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error(
            'useDataContext deve ser usado dentro de um ClientesProvider'
        );
    }
    return context;
};

export { DataProvider, useDataContext };
