import React, { useEffect } from 'react'

import Header from "../components/Header"
import { useParams } from 'react-router-dom'
import RestaurantDetails from '../components/RestaurantDetails';

const RestaurantDetailPage = () => {
    return (
        <div>
            <Header title="Restaurant Details" />
            <RestaurantDetails />

        </div>
    )
}

export default RestaurantDetailPage
