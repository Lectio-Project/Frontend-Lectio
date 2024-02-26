'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

interface User {
    name: string;
    email: string;
    password: string;
}

type IUserContextData = {
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
}

interface AppProviderProps {
    children: ReactNode;
}

const DataContext = createContext<IUserContextData | undefined>(undefined);

const DataProvider: React.FC<AppProviderProps> = ({ children }: AppProviderProps) => {
    const [userData, setUserData] = useState<User>({ name: '', email: '', password: '' });

    const contextValue = {
        userData,
        setUserData
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