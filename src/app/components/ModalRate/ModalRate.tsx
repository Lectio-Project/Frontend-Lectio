import CloseIcon from '../../assets/closeIcon.svg';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import RatingStars from '@/app/components/RatingStars/RatingStars';
import ButtonLectio from '@/app/components/Button/Button';

import './ModalRate.css';
import { useState } from 'react';
import { useDataContext } from '@/context/user';

interface ModalRateProps {
    title: string;
}

export default function ModalRate({title}: ModalRateProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const {rateValue, setRateValue} = useDataContext();
  
    function handleOpen() {
    setShowModal(true);
  }

    function handleClose() {
    setShowModal(false);
  }

    function handleRate() {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div className='container-modalRate'>
            <Button onClick={handleOpen} className='button-rate'>
                <RatingStars starsValues={rateValue} returnValue size='medium' readOnly />
                <span>{title}</span>
            </Button>
            <Modal
                open={showModal}
                onClose={handleClose}
                disableRestoreFocus
            >
                <Box className='modal-rate'>
                    <img className='button-close' src={CloseIcon} alt='close icon' onClick={handleClose} /> 

                    <Typography id='modal-title' variant="h3">
                        {title}
                    </Typography>

                    <div className='modal-rating'>
                        <RatingStars size='large' returnValue/>
                    </div>
                    
                    <div className='modal-comment'>
                        <Typography id="modal-comment-title" variant='caption'>
                            Comentário
                        </Typography>

                        <textarea className='modal-comment-area' placeholder='Escreva aqui o que achou da obra' />

                        <ButtonLectio className='modal-comment-button' title='Avaliar' type='submit' disabled={rateValue === 0 ? true : false} onClick={handleRate}/>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}