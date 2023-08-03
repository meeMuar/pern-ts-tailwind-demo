import React, { useContext, useEffect } from 'react'
import { Restaurant, RestaurantContextType } from '../../../setup/@types/Restaurant'
import { RestaurantsContext } from '../../../setup/context/RestaurantContext'
import RestaurantFinder from '../../../setup/apis/RestaurantFinder'
import { useParams, useNavigate } from 'react-router-dom'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../../../common/components/TextInput'
import Selection from '../../../common/components/Selection'


const UpdateRestaurant: React.FC = () => {
    const { showBoundary } = useErrorBoundary()
    const navigation = useNavigate()
    const { id } = useParams()
    const { updateRestaurant } = useContext(RestaurantsContext) as RestaurantContextType

    const [formData, setFormData] = React.useState<Restaurant | any>({})

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

    function handleUpdate(e: React.FormEvent, formData: Restaurant | any) {
        e.preventDefault();
        (async () => {
            try {
                const responseGet = await RestaurantFinder.get(`/${id}`);
                const oldRestaurant = responseGet.data.data.restaurants[0];
                const responseUpdate = await RestaurantFinder.put(`/${id}/update`, {
                    name: formData.name ? formData.name : oldRestaurant.name,
                    location: formData.location ? formData.location : oldRestaurant.location,
                    price_range: formData.price_range ? formData.price_range : oldRestaurant.price_range
                });
                console.log(responseUpdate);
                updateRestaurant({
                    id: Number(id),
                    ...formData
                })

                navigation('/')

            } catch (error) {
                showBoundary(error)
            }

        })();
    }

    useEffect(() => {
        (async () => {
            try {
                const responseGet = await RestaurantFinder.get(`/${id}`)
                const oldRestaurant = responseGet.data.data.restaurants[0]
                setFormData(oldRestaurant)
            } catch (error) {
                showBoundary(error)
            }

        })()
    }, [])


    return (
        <div className="pt-8 pb-8">

            <form action="" onSubmit={(e) => handleUpdate(e, formData)}>
                <div className="flex flex-col gap-20 items-center justify-center">
                    <h1 className="text-center text-4xl text-green-600">{formData && formData['name']}</h1>
                    <div className="basis-1/3">
                        <TextInput id="name" handleInput={handleForm} placeholder="Name" />
                    </div>
                    <div className="basis-1/3">
                        <TextInput id="location" handleInput={handleForm} placeholder="Location" />
                    </div>
                    <div className="basis-1/6">
                        <Selection id="price_range" handleInput={handleSelection} width={96} />
                    </div>
                    <button
                        disabled={formData === undefined ? true : false}
                        type="submit"
                        className=" rounded-sm border-1 w-48 h-12 bg-green-400 "
                    >
                        Update
                    </button>
                </div>
            </form>

        </div>
    )
}

export default UpdateRestaurant