import { BookProps } from '@/types/book';
import { Rating } from '@mui/material';
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
                <p className="comment">{text}</p>
            </div>
            <div className="book-details">
                <div className="book-info">
                    <p className="book-name">Torto Arado</p>
                    <div className="rating-info">
                        <Rating max={1} value={1} size="medium" readOnly />
                        <span>{`(${book?.avgGrade.toFixed(1)})`}</span>
                    </div>
                </div>
                <div className="see-book">
                    <Link href={`/book-details/${book?.id}`}>
                        <p>Ver o livro</p>
                    </Link>
                    <img src={arrowRight} alt="Seta para direita" />
                </div>
            </div>
        </div>
    );
}
