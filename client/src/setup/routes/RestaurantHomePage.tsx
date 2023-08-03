
import AddRestaurant from "../../pages/RestaurantList/components/AddRestaurant"
import Header from "../../common/components/Header"
import RestaurantList from "../../pages/RestaurantList/components/RestaurantList"

const Home = () => {
    return (
        <div>
            <Header title="Restaurant Finder" />
            <AddRestaurant />
            <RestaurantList />
        </div>
    )
}

export default Home
