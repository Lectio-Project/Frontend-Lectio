'use client'

import { ReactNode, createContext, useContext, useState } from 'react';


interface User {
    id: string;
    name: string;
    email: string;
    userName?: string;
    password?: string;
    bio?: string;
    imageUrl?: string;
    token?: string;
}


type IUserContextData = {
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
    showModalEdit: boolean;
    setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
    showModalImage: boolean;
    setShowModalImage: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AppProviderProps {
    children: ReactNode;
}

const DataContext = createContext<IUserContextData | undefined>(undefined);

const DataProvider: React.FC<AppProviderProps> = ({ children }: AppProviderProps) => {
    
    const [userData, setUserData] = useState<User>({ 
        name: '', 
        email: '', 
        password: '', 
        userName:'', 
        bio:'' , 
        id: '', 
        token: '', 
        imageUrl: ''
    });

    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [showModalImage, setShowModalImage] = useState<boolean>(false);

    const contextValue = {
        userData,
        setUserData,
        showModalEdit,
        setShowModalEdit,
        showModalImage,
        setShowModalImage
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