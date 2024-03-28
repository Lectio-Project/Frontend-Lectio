import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import './Rating.css'

interface PropRatingStars {
    starsValues: number;
    size: 'small' | 'medium' | 'large';
    readOnly?: boolean;
    bookValue?: number;
}

export default function RatingStars({starsValues, size, readOnly, bookValue}: PropRatingStars) {
    const customIcons = {
        empty: {
            icon: <StarIcon className='starIcon' style={{ fontSize: size === 'small' ? '12px' : (size === 'medium' ? '15px' : '19px') }} />
        },
    };
    return (
        <div className='ratingStars'>
            <Rating defaultValue={starsValues} precision={0.5} size={size} readOnly={readOnly} emptyIcon={customIcons.empty.icon} />
            {bookValue >= 0 && <strong className='rating-note'>{bookValue !== 0 ? bookValue.toFixed(1) : bookValue}</strong>}
        </div>
    )
}