'use client'
import './config-account.css';
import { useDataContext } from '@/context/user';

export default function ConfigAccount(){
    const { userData } = useDataContext();

    return(
        <main>
            <p>{userData.name}</p>
        </main>
    )
}