import AddRestaurant from "./components/AddRestaurant";
import Header from "../../common/components/Header";
import RestaurantList from "./components/RestaurantList";

const Home = () => {
  return (
    <div>
      <Header title="Gustaurant Finder" />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;