import './hamburguerMenu.css';
import { Avatar, Box, Drawer, useTheme } from "@mui/material";
import CloseIcon from '../../assets/closeIcon.svg';
import GoIcon from '../../assets/arrowBackHamburguer.svg';
import GoIconY from '../../assets/arrowBackHamburguerYellow.svg';
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
        variant="temporary" 
        anchor={'right'} 
        PaperProps={{ style: { boxShadow: '0px -8px 22.8px 0px rgba(0,0,0,1)' } }}
        >

            <Box className='menu-box' width={theme.spacing(25)}>

                <Box className= 'close-container' onClick= {()=> setOpenDrawer(false)}>
                    <Avatar className='avatar' src={CloseIcon} alt='close icon'/> 
                </Box>

                <Box className= 'itens-container'>
                    <div 
                    className={`item-menu ${select === 'inicio' ? 'selected': ''}`}
                    onClick={()=> router.push('/home')}
                    >
                        <img src={select === 'inicio'? GoIconY : GoIcon} alt='Icon go'/>
                        <span>Início</span>
                    </div>

                    <div 
                    className={`item-menu ${select === 'feed' ? 'selected': ''}`}
                    onClick={()=> router.push('/feed')}
                    >
                        <img src={select === 'feed'? GoIconY : GoIcon} alt='Icon go'/>
                        <span>Feed</span>
                    </div>

                    <div 
                    className={`item-menu ${select === 'perfil' ? 'selected': ''}`}
                    onClick={()=> router.push('/dashboard/config-account')}
                    >
                        <img src={select === 'perfil'? GoIconY : GoIcon} alt='Icon go'/>
                        <span>Perfil</span>
                    </div>
                </Box>
                
            </Box>
        </Drawer>
    )
}