

import { Rating } from '@mui/material';
import { SearchBooks } from '@/types/search-types';

import StarIcon from '@mui/icons-material/Star';

import './SearchResultsBooks.css';

export default function SearchResultsBooks({ results }: SearchBooks){
    return(
        results.slice(0,12).map((result) => (
            <section key={result.id} className='default-book-list-search'>
                <section className='info-book-search'>
                    <h3 className='book-title-search'>{result.name}</h3>
                    <h4 className='book-author-search'>por <span>{result.AuthorBook[0].author.name}</span></h4>
                </section>
                <img src={result.imageUrl} className='book-image-search'/>
                <span className='book-genre-search'>{result.gender.gender}</span>
                <div className='container-book-rating-search'>
                    <Rating
                        className='book-rating-star-search'
                        max={5}
                        value={result.avgGrade}
                        size='large'
                        readOnly
                        emptyIcon={<StarIcon fontSize="inherit" style={{ color: 'var(--neutral-gray)' }} />}
                    />
                    <span className='book-rating-search'>{result.avgGrade.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                </div>
            </section>
    )))
}