import arrowRight from '../../assets/arrowGoYellow.svg';
import BookHighlight from '../BookHighlight/BookHighlight';
import './BookFeed.css';

interface BookFeedProps {
  title: string
}

export default function BookFeed({ title }: BookFeedProps) {
  return (
    <div className="container-books">
      <header>
          <h3>{title}</h3>
          <div className="see-all-per-category">
            <p>Ver todos na categoria</p>
            <img src={arrowRight} alt="Seta para direita" />
          </div>
        </header>
        <BookHighlight />
    </div>
  )
}