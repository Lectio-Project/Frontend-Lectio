import CloseIcon from '../../assets/closeIcon.svg';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import RatingStars from '@/app/components/Rating/Rating';
import ButtonLectio from '@/app/components/Button/Button';

import './ModalRate.css';
import { useState } from 'react';

interface ModalRateProps {
    title: string;
}

export default function ModalRate({title}: ModalRateProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className='container-modalRate'>
        <Button onClick={handleOpen} className='button-rate'>
            <RatingStars starsValues={0} size='medium' readOnly />
            <span>{title}</span>
        </Button>
        <Modal
            open={showModal}
            onClose={handleClose}
            disableRestoreFocus
        >
            <Box className='modal-rate'>
                <img className='button-close' src={CloseIcon} alt='close icon' onClick={handleClose} /> 

                <Typography variant="h3">
                    <h3 className='modal-title'>{title}</h3>
                </Typography>

                <div className='modal-rating'>
                    <RatingStars starsValues={0} size='large' />
                </div>
                
                <div className='modal-comment'>
                    <Typography variant='caption'>
                        <span className="modal-comment-title">Comentário</span>
                    </Typography>

                    <textarea className='modal-comment-area' placeholder='Escreva aqui o que achou da obra' />

                    <ButtonLectio className='modal-comment-button' title='Avaliar' type='submit' disabled={isDisabled} />
                </div>
            </Box>
        </Modal>
    </div>
  );
}