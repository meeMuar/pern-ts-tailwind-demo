import React from 'react'
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';

type Props = {
    rating: number
    review_amount?: number
}

const StarRatingComponent: React.FC<Props> = ({ rating, review_amount }) => {



    let stars = [];

    for (let i = 0; i < 5; i++) {
        if (rating >= 1) {
            stars.push(<BsStarFill />)
            rating--
        } else if (rating >= 0.5) {
            stars.push(<BsStarHalf />)
            rating--
        }
        else {
            stars.push(<BsStar />)
        }
    }
    return (
        <div className='relative top-1 flex justify-center p-2'>
            {stars}
            {review_amount && <p className='relative bottom-1 left-1'> ({review_amount})</p>}
        </div>
    )
}

export default StarRatingComponent
