import React from 'react'
import { Review } from '../@types/RestaurantsReviews'
import StarRatingComponent from './StarRatingComponent'

type Props = {
    review: Review;
}

const ReviewComponent: React.FC<Props> = (props) => {
    return (
        <div className='flex flex-col w-72 text-gray-200 rounded-lg'>
            <div id="header" className=' bg-blue-700 flex justify-between h-12 '>
                <h1 id="restaurant_name" className=' px-6 pt-2'> {props.review.name}</h1>
                <div id="star rating" className='flex justify-center p-3 text-yellow-300'> {<StarRatingComponent rating={props.review.rating} />}</div>
            </div>
            <div id='body' className=' bg-blue-600 h-20'>
                <p id="review_text " className=' px-6 pt-2'>{props.review.review}</p>
            </div>
        </div>
    )
}

export default ReviewComponent
