import { Rating, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { useDataContext } from '@/context/user';
import { Star } from '@mui/icons-material';
import { useEffect } from 'react';
import './RatingStars.css';

interface PropRatingStars {
    starsValues?: number;
    size: 'small' | 'medium' | 'large';
    readOnly?: boolean;
    bookValue?: number;
    authorValue?: number;
    returnValue?: boolean;
}

export default function RatingStars({
    starsValues,
    size,
    readOnly,
    bookValue,
    authorValue,
    returnValue
}: PropRatingStars) {
    const { rateValue, setRateValue } = useDataContext();
    const isDesktop = useMediaQuery('(min-width:1280px)');

    useEffect(() => {
        setRateValue(starsValues || 0);
    }, []);

    const customIcons = {
        star: {
            icon: (
                <Star
                    style={{
                        fontSize:
                            size === 'small'
                                ? '16px'
                                : size === 'medium'
                                ? '24px'
                                : '34px'
                    }}
                />
            )
        },
        empty: {
            icon: (
                <StarIcon
                    className="starIcon"
                    style={{
                        fontSize:
                            size === 'small'
                                ? '16px'
                                : size === 'medium'
                                ? '24px'
                                : '34px'
                    }}
                />
            )
        }
    };

    const handleValue = (changeValue: number) => {
        if (returnValue) {
            setRateValue(changeValue);
        }
    };

    return (
        <div className="ratingStars">
            <Rating
                defaultValue={starsValues}
                precision={bookValue || authorValue ? 0.1 : 0.5}
                size={size}
                readOnly={readOnly}
                emptyIcon={customIcons.empty.icon}
                icon={customIcons.star.icon}
                value={returnValue ? rateValue : starsValues}
                onChange={(e, value) => handleValue(value!)}
            />
            {bookValue && <strong className='rating-note-book'>{bookValue !== 0 ? bookValue.toFixed(1) : bookValue}</strong>}
            {authorValue && <span className='rating-note-author'>{isDesktop ? `${authorValue} avaliações` : `(${authorValue})`}</span>}
        </div>
    );
}
