import { BookProps } from '@/types/book';
import arrowRight from '../../assets/arrowGoYellow.svg';
import BookHighlight from '../BookHighlight/BookHighlight';
import './BookFeed.css';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';
import { useDataContext } from '@/context/user';

interface BookFeedProps {
    title: string;
    books: BookProps[];
    link: string
}

export default function BookFeed({ title, books, link }: BookFeedProps) {
    const booksWithCommentsText = books.filter(
        (book) => book.Comment?.filter((comment) => comment.text).length > 0
    );

    const isMobile = useMediaQuery('(max-width: 767px)')

    const { setBooksSelected, setTitleSelected } = useDataContext()

    return (
        <div className="container-books">
            <header>
                <h3>{title}</h3>
                <div className="see-all-per-category">
                    <Link onClick={() => { setBooksSelected(books); setTitleSelected(title)}} href={`/feed/${link}`}>{isMobile ? 'Ver todos' : 'Ver todos na categoria'}</Link>
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
