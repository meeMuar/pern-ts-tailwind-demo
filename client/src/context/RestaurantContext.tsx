import React, { useState, createContext } from 'react';
import { Restaurant, RestaurantContextType } from '../@types/RestaurantsReviews';
import RestaurantFinder from '../apis/RestaurantFinder';
//import { useNavigate } from 'react-router-dom';


export const RestaurantsContext = createContext<RestaurantContextType | null>(null);
type Props = {
    children?: React.ReactNode
};

const RestaurantContextProvider: React.FC<Props> = ({ children }) => {



    const [restaurants, setRestaurants] = useState<Restaurant[]>([
    ]);


    const saveRestaurants = (newRestaurants: Restaurant[]) => {

        setRestaurants([...newRestaurants]);



    }

    const addRestaurant = (newRestaurant: Restaurant) => {

        setRestaurants([...restaurants, newRestaurant])
    }

    const updateRestaurant = (updatedRestaurant: Restaurant) => {
        restaurants.filter((restaurant: Restaurant) => {
            if (restaurant.id === updatedRestaurant.id) {

                restaurant.name = updatedRestaurant.name;
                restaurant.location = updatedRestaurant.location;
                restaurant.price_range = updatedRestaurant.price_range;

                console.log("updated!")
            }
        })
    }

    const deleteRestaurant = (id: number) => {
        (async () => {
            try {
                const response = await RestaurantFinder.delete(`/${id}`);
                console.log(response);
                setRestaurants(restaurants.filter((restaurant: Restaurant) => {

                    return restaurant.id !== id;
                }))
            } catch (error) {
                console.log(error)
            }

        })();
    }

    return (
        <RestaurantsContext.Provider value={{ restaurants, saveRestaurants, addRestaurant, updateRestaurant, deleteRestaurant }}>
            {children}
        </RestaurantsContext.Provider>
    )
}

export default RestaurantContextProvider