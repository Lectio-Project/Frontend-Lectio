import Link from "next/link";
import './navBar.css';

interface NavProps{
    select: string;
}


export default function NavBar({select}:NavProps){
    return(
        <nav className="nav-container">
            <Link className="link-nav" href="/home">
                <span className={`text-nav ${select=== 'home' ? 'select-option' : ''} `}>Início</span>
            </Link>

            <Link className="link-nav" href="/feed">
                <span className={`text-nav ${select=== 'feed' ? 'select-option' : ''} `}>Feed</span>
            </Link>

            <Link className="link-nav" href="/dashboard/config-account">
                <span className={`text-nav ${select==='perfil' ? 'select-option' : ''} `}>Perfil</span>
            </Link>
        </nav>
    )
}