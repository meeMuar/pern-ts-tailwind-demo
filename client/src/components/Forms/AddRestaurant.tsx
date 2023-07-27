import React, { useContext } from 'react'
import { Restaurant, RestaurantContextType } from '../../@types/RestaurantsReviews'
import { RestaurantsContext } from '../../context/RestaurantContext';
import RestaurantFinder from '../../apis/RestaurantFinder';




const AddRestaurant: React.FC = () => {


    const { restaurants, addRestaurant } = useContext(RestaurantsContext) as RestaurantContextType;

    const [formData, setFormData] = React.useState<Restaurant | {}>();

    function handleForm(e: React.FormEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    function handleSelection(e: React.FormEvent<HTMLSelectElement>) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })

    }


    function handleAdd(e: React.FormEvent, formData: Restaurant | any) {
        e.preventDefault();

        (async () => {
            try {
                const response = await RestaurantFinder.post("/", {
                    name: formData.name,
                    location: formData.location,
                    price_range: formData.price_range
                });
                console.log(response);
                addRestaurant({
                    id: restaurants[restaurants.length - 1].id + 1,
                    ...formData
                });
            } catch (error) {
                console.log(error);
            }

        })();
    }

    return (
        <div className="pt-8 pb-8">
            <form action="" onSubmit={(e) => handleAdd(e, formData)}>
                <div className="flex flex-row gap-0 justify-center">
                    <div className="basis-1/3">
                        <input
                            id="name"
                            onChange={handleForm}
                            type="text"
                            className="w-96 h-10 min-h-fit rounded-sm border-2 border-neutral-200 p-1"
                            placeholder="Name"
                        />
                    </div>
                    <div className="basis-1/3">
                        <input
                            id="location"
                            onChange={handleForm}
                            className="w-96 h-10 min-h-fit rounded-sm border-2 border-neutral-200 p-1"
                            type="text"
                            placeholder="Location"
                        />
                    </div>
                    <div className="basis-1/6">
                        <select
                            id="price_range"
                            onChange={handleSelection}
                            defaultValue={'DEFAULT'}
                            className="w-48 h-10 min-h-fit rounded-sm border-2 border-neutral-200 p-1"
                        >
                            <option value="DEFAULT" disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>

                        </select>
                    </div>
                    <button
                        disabled={formData === undefined ? true : false}
                        type="submit"
                        className=" rounded-sm border-1 w-24 min-h-min bg-green-400 "
                    >
                        Add
                    </button>
                </div>
            </form>

        </div>
    )
}

export default AddRestaurant