import React, { useContext, useState, useEffect } from 'react'
import { Restaurant, RestaurantContextType, Review } from '../../@types/RestaurantsReviews'
import RestaurantFinder from '../../apis/RestaurantFinder';
import { useParams, useNavigate } from 'react-router-dom';
// import StarRatingComponent from './StarRatingComponent';
import Select, { components, OptionProps } from "react-select";
import StarRatingComponent from '../StarRatingComponent';

type RatingsType = {
    value: number,
    label: string,

}

interface ArrayObjectSelectState {
    selectedRating: RatingsType | null;
}

const ratings: RatingsType[] = [
    { value: 1, label: "Awful" },
    { value: 2, label: "Bad" },
    { value: 3, label: "Decent" },
    { value: 4, label: "Good" },
    { value: 5, label: "Great" },
]

const Option = (props: OptionProps<RatingsType>) => {
    return (
        <div
            style={{
                padding: "2px",
                display: "flex",
                gap: "1px",
                justifyContent: "center",
            }}
        >
            <components.Option {...props} />
            <StarRatingComponent rating={props.value} />
        </div>
    );
};


const AddReview: React.FC = () => {
    const navigation = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = React.useState<Review | {}>();
    const [restaurantName, setRestaurantName] = React.useState<String>();
    const [selectedOption, setSelectedOption] = useState<ArrayObjectSelectState>({
        selectedRating: null
    });



    function handleForm(e: React.FormEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    function handleSubmit(e: React.FormEvent, formData: Review | any) {

        setFormData({
            ...formData,
            restaurant_name: restaurantName
        });
        e.preventDefault();

        async function AmongUs() {
            try {
                console.log('async started')
                const responseUpdate = await RestaurantFinder.post(`/${id}/reviews`, {
                    name: formData.name,
                    rating: formData.rating,
                    review: formData.review
                });
                console.log(responseUpdate);
                navigation('/');

            } catch (error) {
                console.log(error);
            }

        };

        AmongUs();
        console.log('async tried????')
    }



    useEffect(() => {
        (async () => {
            try {
                const responseGet = await RestaurantFinder.get(`/${id}`);
                const Restaurant = responseGet.data.data.restaurants[0];
                setRestaurantName(Restaurant.name)
            } catch (error) {

            }

        })()
    }, [])


    return (
        <div className="pt-8 pb-8">

            <form action="" onSubmit={(e) => handleSubmit(e, formData)}>
                <div className="flex flex-col gap-20 items-center justify-center">
                    {/* <h1 className="text-center text-4xl text-green-600">{restaurantName}</h1> */}
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
                            id="review"
                            onChange={handleForm}
                            className="w-96 h-10 min-h-fit rounded-sm border-2 border-neutral-200 p-1"
                            type="text"
                            placeholder="Review"
                        />
                    </div>
                    <div className="basis-1/6">
                        <Select

                            className="w-72 h-10 min-h-fi p-1"
                            components={{ Option }}
                            isMulti={false}
                            id="rating"
                            onChange={(option: RatingsType | null) => {
                                console.log(option)
                                setSelectedOption({ selectedRating: option })
                                setFormData({
                                    ...formData,
                                    rating: option?.value
                                });
                            }}
                            value={selectedOption.selectedRating}

                            options={ratings}
                            isClearable={true}
                        />
                    </div>
                    <button
                        // disabled={formData === undefined ? true : false}
                        type="submit"
                        className=" rounded-sm border-1 w-48 h-12 bg-green-400 "
                    >
                        Add
                    </button>
                </div>
            </form>

        </div>
    )
}

export default AddReview