import React, { useContext } from 'react'
import { Restaurant, RestaurantContextType } from '../../../setup/@types/Restaurant'
import { RestaurantsContext } from '../../../setup/context/RestaurantContext';
import RestaurantFinder from '../../../setup/apis/RestaurantFinder';
import { useErrorBoundary } from 'react-error-boundary';
import TextInput from '../../../common/components/TextInput';
import Selection from '../../../common/components/Selection';


const AddRestaurant: React.FC = () => {

    const { showBoundary } = useErrorBoundary();
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
                showBoundary(error);
            }

        })();
    }

    return (
        <div className="pt-8 pb-8">
            <form action="" onSubmit={(e) => handleAdd(e, formData)}>
                <div className="flex flex-row gap-0 justify-center">
                    <div className="basis-1/3">
                        <TextInput id="name" handleInput={handleForm} placeholder="Name" />
                    </div>
                    <div className="basis-1/3">
                        <TextInput id="location" handleInput={handleForm} placeholder="Location" />
                    </div>
                    <div className="basis-1/6">
                        <Selection id="price_range" handleInput={handleSelection} width={48} />
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