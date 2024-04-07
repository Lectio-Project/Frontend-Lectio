import { BookProps } from '@/types/book';
import arrowRight from '../../assets/arrowGoYellow.svg';
import BookHighlight from '../BookHighlight/BookHighlight';
import './BookFeed.css';

interface BookFeedProps {
    title: string;
    books: BookProps[];
}

export default function BookFeed({ title, books }: BookFeedProps) {
    const booksWithCommentsText = books.filter(
        (book) => book.Comment.filter((comment) => comment.text).length > 0
    );

    return (
        <div className="container-books">
            <header>
                <h3>{title}</h3>
                <div className="see-all-per-category">
                    <p>Ver todos na categoria</p>
                    <img src={arrowRight} alt="Seta para direita" />
                </div>
            </header>
            <div className="books">
                {booksWithCommentsText &&
                    booksWithCommentsText
                        .slice(0, 2)
                        .map((book) => <BookHighlight book={book} />)}
            </div>
        </div>
    );
}
