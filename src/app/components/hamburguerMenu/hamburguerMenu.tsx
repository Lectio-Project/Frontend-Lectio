import './hamburguerMenu.css';
import { Avatar, Box, Drawer, useTheme } from "@mui/material";
import CloseIcon from '../../assets/closeIcon.svg';
import GoIcon from '../../assets/arrowGo.svg';
import GoIconY from '../../assets/arrowGoYellow.svg';
import { useDataContext } from '@/context/user';
import { useRouter } from 'next/navigation';

interface propsDrawner {
    select?: string;
}


export default function HamburguerMenu({select}:propsDrawner){
    const {openDrawer, setOpenDrawer}= useDataContext();
    const theme= useTheme();
    const router = useRouter();

    return(
        <Drawer 
        open={openDrawer} 
        onClose={()=>setOpenDrawer(false)}
        variant="temporary" anchor={'right'} 
        >

            <Box className='menu-box' width={theme.spacing(30)}>

                <Box className= 'close-container' onClick= {()=> setOpenDrawer(false)}>
                    <Avatar className='avatar' src={CloseIcon} alt='close icon'/> 
                </Box>

                <Box className= 'itens-container'>
                    <div 
                    className={`item-menu ${select === 'inicio' ? 'selected': ''}`}
                    onClick={()=> router.push('/home')}
                    >
                        <span>Início</span>
                        <img src={select === 'inicio'? GoIconY : GoIcon} alt='Icon go'/>
                    </div>

                    <div 
                    className={`item-menu ${select === 'feed' ? 'selected': ''}`}
                    onClick={()=> router.push('/feed')}
                    >
                        <span>Feed</span>
                        <img src={select === 'feed'? GoIconY : GoIcon} alt='Icon go'/>
                    </div>

                    <div 
                    className={`item-menu ${select === 'perfil' ? 'selected': ''}`}
                    onClick={()=> router.push('/dashboard/config-account')}
                    >
                        <span>Perfil</span>
                        <img src={select === 'perfil'? GoIconY : GoIcon} alt='Icon go'/>
                    </div>
                </Box>
                
            </Box>
        </Drawer>
    )
}