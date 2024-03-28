import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import './Rating.css'
import { Star } from '@mui/icons-material';

interface PropRatingStars {
    starsValues: number;
    size: 'small' | 'medium' | 'large';
    readOnly?: boolean;
    bookValue?: number;
}

export default function RatingStars({starsValues, size, readOnly, bookValue}: PropRatingStars) {
    const customIcons = {
        star: {
            icon: <Star style={{ fontSize: size === 'small' ? '16px' : (size === 'medium' ? '24px' : '34px') }}/>   
        },
        empty: {
            icon: <StarIcon className='starIcon' style={{ fontSize: size === 'small' ? '16px' : (size === 'medium' ? '24px' : '34px') }} />
        },
    };
    return (
        <div className='ratingStars'>
            <Rating defaultValue={starsValues} precision={0.5} size={size} readOnly={readOnly} emptyIcon={customIcons.empty.icon} icon={customIcons.star.icon} />
            {bookValue >= 0 && <strong className='rating-note'>{bookValue !== 0 ? bookValue.toFixed(1) : bookValue}</strong>}
        </div>
    )
}