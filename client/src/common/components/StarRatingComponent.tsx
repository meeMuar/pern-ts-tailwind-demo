import React from 'react'
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';

type Props = {
    rating: number
    review_amount?: number
    showCount: boolean
}

const StarRatingComponent: React.FC<Props> = ({ rating, review_amount, showCount }) => {



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
            {stars.map((star, index) => {
                return <h1 key={index}>{star}</h1>
            })}
            {showCount && <p className='relative bottom-1 left-1'> ({review_amount ? review_amount : "0"})</p>}
        </div>
    )
}

export default StarRatingComponent
