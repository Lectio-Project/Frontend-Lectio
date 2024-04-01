import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import './RatingStars.css'
import { Star } from '@mui/icons-material';
import { useDataContext } from '@/context/user';

interface PropRatingStars {
    starsValues?: number;
    size: 'small' | 'medium' | 'large';
    readOnly?: boolean;
    bookValue?: number;
    returnValue?: boolean;
}

export default function RatingStars({starsValues, size, readOnly, bookValue, returnValue}: PropRatingStars) {
    const {setRateValue} = useDataContext();

    const handleRatingChange = (event: any, newValue: number) => {
        setRateValue(newValue);
    };

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
            <Rating defaultValue={starsValues || 0} precision={bookValue ? 0.1 : 0.5} size={size} readOnly={readOnly} emptyIcon={customIcons.empty.icon} icon={customIcons.star.icon} onChange={returnValue && handleRatingChange} />
            {bookValue >= 0 && <strong className='rating-note'>{bookValue !== 0 ? bookValue.toFixed(1) : bookValue}</strong>}
        </div>
    )
}