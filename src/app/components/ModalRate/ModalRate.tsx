import CloseIcon from '../../assets/closeIcon.svg';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import ButtonLectio from '@/app/components/Button/Button';
import RatingStars from '@/app/components/RatingStars/RatingStars';

import api from '@/api/api';
import { useDataContext } from '@/context/user';
import { getCookie } from '@/utils/cookies';
import { useState } from 'react';

import './ModalRate.css';

interface ModalRateProps {
    title: string;
    bookId: string;
    addComment: number;
    setAddComment: React.Dispatch<React.SetStateAction<number>>;
}

export default function ModalRate({
    title,
    bookId,
    addComment,
    setAddComment
}: ModalRateProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const { rateValue, setRateValue } = useDataContext();

    function handleOpen() {
        setShowModal(true);
    }

    function handleClose() {
        setShowModal(false);
    }

    async function handleRate() {
        try {
            const token = await getCookie('token');
            const request = {
                text: text,
                bookGrade: rateValue,
                bookId: bookId
            };

            await api.post(`/comments`, request, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            setAddComment(addComment + 1);
            handleClose();
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <div className="container-modalRate">
            <Button onClick={handleOpen} className="button-rate">
                <RatingStars
                    starsValues={0}
                    returnValue
                    size="medium"
                    readOnly
                />
                <span>{title}</span>
            </Button>
            <Modal open={showModal} onClose={handleClose} disableRestoreFocus>
                <Box className="modal-rate">
                    <img
                        className="button-close"
                        src={CloseIcon}
                        alt="close icon"
                        onClick={handleClose}
                    />

                    <Typography id="modal-title" variant="h3">
                        {title}
                    </Typography>

                    <div className="modal-rating">
                        <RatingStars size="large" returnValue />
                    </div>

                    <div className="modal-comment">
                        <Typography id="modal-comment-title" variant="caption">
                            Comentário
                        </Typography>

                        <textarea
                            className="modal-comment-area"
                            placeholder="Escreva aqui o que achou da obra"
                            onChange={(e) => setText(e.target.value)}
                        />

                        <ButtonLectio
                            className="modal-comment-button"
                            title="Avaliar"
                            type="submit"
                            disabled={rateValue === 0 ? true : false}
                            onClick={handleRate}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
