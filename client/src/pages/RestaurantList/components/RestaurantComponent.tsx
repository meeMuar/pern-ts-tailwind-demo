import React from 'react'
import { Restaurant } from '../../../setup/@types/Restaurant';
import { useNavigate } from 'react-router-dom';
import StarRatingComponent from '../../../common/components/StarRatingComponent';
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
            <td>
                {<StarRatingComponent rating={restaurant.rating} review_amount={restaurant.review_amount} showCount={true} />}
            </td>
            <td>
                <button
                    onClick={(e) => routeToUpdate(e, restaurant.id)}
                    className=" bg-yellow-400 rounded-md p-1"
                >
                    Update
                </button>
            </td>
            <td>
                <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className="bg-red-400 rounded-md p-1"
                >
                    Delete
                </button>
            </td>
        </tr>

    )
}

export default RestaurantComponent
