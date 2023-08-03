import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../../../setup/apis/RestaurantFinder';
import { Review } from '../../../setup/@types/Review';
import ReviewComponent from './ReviewComponent';
import AddReview from './AddReview';
import { useErrorBoundary } from 'react-error-boundary';


const RestaurantDetails: React.FC = () => {

  const { showBoundary } = useErrorBoundary()

  const { id } = useParams()

  const [reviews, setReviews] = useState<Review[]>([
  ])

  const saveReviews = (newReviewsJSON: Review[]) => {
    setReviews([...newReviewsJSON])
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}/reviews`);
        const reviews = response.data.reviews;

        saveReviews(reviews.slice(-4));
      } catch (error) {
        showBoundary(error)
      }
    }
    )()

  }, [])

  return (
    <div>


      <h2 className=" p-5 text-center text-3xl text-green-400"> {reviews[0]?.restaurant_name}</h2>
      <div className='flex justify-center gap-24'>
        {reviews.length > 0 ? reviews.slice(0).reverse().map((newReview: Review) => (

          <ReviewComponent key={newReview.id} review={newReview} />

        )) : <h2 className=" p-5 text-center text-3xl text-green-400"> So far this establishment had no feedback submitted :( </h2>}
      </div>
      <AddReview />

    </div>
  )
}

export default RestaurantDetails
