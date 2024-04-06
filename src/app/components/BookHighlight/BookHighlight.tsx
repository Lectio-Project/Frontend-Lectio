import { Rating } from "@mui/material";
import RatingStars from "../RatingStars/RatingStars";
import arrowRight from '../../assets/arrowGoGreen.svg';
import './BookHighlight.css';

export default function BookHighlight() {
  return (
    <div className="full-book">
      <header>
        <div className="user">
          <div className="avatar"></div>
          <div className="user-details">
            <p>Isabela Valadares</p>
            <div className="rating">
              <RatingStars size="small" starsValues={4.0} readOnly />
              <span className="grade">4.0</span>
            </div>
          </div>
        </div>
        <p>24/12/2023</p>
      </header>
      <div className="book-comment">
        <div className="book"></div>
        <p className="comment">"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, natus ipsum iusto reiciendis a architecto atque necessitatibus! Rem sequi officiis omnis quam non debitis impedit a!"</p>
      </div>
      <div className="book-details">
        <div className="book-info">
          <p className="book-name">Torto Arado</p>
          <div className="rating-info">
            <Rating max={1} value={1} size="medium" readOnly />
            <span>(4.8)</span>
          </div>
        </div>
        <div className="see-book">
            <p>Ver o livro</p>
            <img src={arrowRight} alt="Seta para direita" />
          </div>
      </div>
    </div>
  )
}