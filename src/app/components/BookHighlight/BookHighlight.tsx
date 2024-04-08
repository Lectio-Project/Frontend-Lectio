import { BookProps } from '@/types/book';
import { Rating, useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';
import arrowRight from '../../assets/arrowGoGreen.svg';
import RatingStars from '../RatingStars/RatingStars';
import './BookHighlight.css';

interface BookHighlightProps {
    book: BookProps;
}

export default function BookHighlight({ book }: BookHighlightProps) {
    const { Comment } = book;
    const comment = Comment.find((comment) => comment.text);
    const { user, bookGrade, createdAt, text } = comment || {};

    const isMobile = useMediaQuery('(max-width: 767px)')
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)')
    const isDesktop = useMediaQuery('(min-width: 1025px)')
    
    function formatedDate(date: string) {
        return date && format(date, 'dd/MM/yyyy');
    }
    return (
        <div className="full-book">
            <header>
                <div className="user">
                    <div>
                        <img
                            className="avatar"
                            src={user?.imageUrl}
                            alt="imagem de perfil do usuario"
                        />
                    </div>
                    <div className="user-details">
                        <p>{user?.name}</p>
                        <div className="rating">
                            <RatingStars
                                size="small"
                                starsValues={bookGrade}
                                readOnly
                            />
                            <span className="grade">
                                {bookGrade?.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>
                <p>{formatedDate(createdAt!)}</p>
            </header>
            <div className="book-comment">
                <div>
                    <img
                        className="book"
                        src={book?.imageUrl}
                        alt={`imagem do livro ${book?.name}`}
                    />
                </div>
                <p className="comment">{(isDesktop && text?.substring(0, 290) + '...') || (isTablet && text?.substring(0, 200) + '...') || (isMobile && text?.substring(0, 170) + '...')}</p>
            </div>
            <div className="book-details">
                <div className="book-info">
                    <p className="book-name">{book.name}</p>
                    <div className="rating-info">
                        <Rating max={1} value={1} size="medium" readOnly />
                        <span>{`(${book?.avgGrade.toFixed(1)})`}</span>
                    </div>
                </div>
                <div className="see-book">
                    <Link href={`/feed/book-details/${book?.id}`}>
                        <p>Ver o livro</p>
                    </Link>
                    <img src={arrowRight} alt="Seta para direita" />
                </div>
            </div>
        </div>
    );
}
