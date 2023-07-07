import React from 'react'
import { Restaurant } from '../@types/RestaurantsReviews';
import { useNavigate } from 'react-router-dom';
import StarRatingComponent from './StarRatingComponent';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

type Props = {
    restaurant: Restaurant;
    deleteRestaurant: (id: number) => void;
};
const RestaurantComponent: React.FC<Props> = ({ restaurant, deleteRestaurant }) => {
    const navigation = useNavigate();

    function routeToUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        e.stopPropagation();
        navigation(`/restaurants/${id}/update`)
    }

    function routeToDetails(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: number) {
        e.stopPropagation();
        navigation(`/restaurants/${id}`)
    }

    function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        e.stopPropagation();
        deleteRestaurant(id);
    }

    return (

        <tr
            onClick={(e) => routeToDetails(e, restaurant.id)}
            key={restaurant.id}
            className=' text-center'
        >
            <td>{restaurant.name}</td>
            <td>{restaurant.location}</td>
            <td>{"$".repeat(restaurant.price_range)}</td>
            <td className='flex justify-center p-2'>{<StarRatingComponent rating={restaurant.rating} />}</td>
            <td>
                <button
                    onClick={(e) => routeToUpdate(e, restaurant.id)}
                    className=" bg-yellow-400"
                >
                    Update
                </button>
            </td>
            <td>
                <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className="bg-red-400"
                >
                    Delete
                </button>
            </td>
        </tr>

    )
}

export default RestaurantComponent
