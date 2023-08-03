import React from 'react'
import { Review } from '../../../setup/@types/Review'
import StarRatingComponent from '../../../common/components/StarRatingComponent'

type Props = {
    review: Review;
}

const ReviewComponent: React.FC<Props> = ({ review }) => {
    return (
        <div className='flex flex-col w-72 text-gray-200 rounded-lg'>
            <div id="header" className=' bg-blue-700 flex justify-between h-14  rounded-t-md'>
                <h1 id="restaurant_name" className=' px-6 pt-2.5 '> {review.name}</h1>
                <div id="star rating" className=' text-yellow-300'> {<StarRatingComponent rating={review.rating} showCount={false} />}</div>
            </div>
            <div id='body' className=' bg-blue-600 h-20 rounded-b-md'>
                <p id="review_text " className=' px-6 pt-2 w-72 break-words'>{review.review}</p>
            </div>
        </div>
    )
}

export default ReviewComponent
