export interface Restaurant {
    id: number,
    name: string;
    location: string;
    price_range: number;
    rating: number;
    review_amount: number;

}

export interface Review {
    id: number,
    name: string,
    review: string,
    rating: number,
    restaurant_name: string,
    restaurants_id: number
}

export type RestaurantContextType = {
    restaurants: Restaurant[];
    saveRestaurants: (restaurants: Restaurant[]) => void;
    updateRestaurant: (restaurant: Restaurant) => void;
    deleteRestaurant: (id: number) => void;
    addRestaurant: (restaurant: Restaurant) => void;
};