import React from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs';

type Props = {
    rating: number
}

const StarRatingComponent: React.FC<Props> = (props) => {



    let stars = [];
    let rating = props.rating;

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<BsStarFill />)
        } else {
            stars.push(<BsStar />)
        }
    }
    return (
        <>
            {stars}
        </>
    )
}

export default StarRatingComponent
