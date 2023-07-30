require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3001;
const commonApiRoute = "/api/v1";
const db = require("./db");

//app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());



//************ RESTAURANTS API *****************/
app.get(commonApiRoute + "/restaurants", async (req, res) => {
    try {
        const getAllRestaraunts = (await db.query(`SELECT 
            restaurants.id,restaurants.name,restaurants.location,restaurants.price_range,
            (
            SELECT trunc(AVG(rating),1)
            FROM reviews 
            WHERE restaurants.id = reviews.restaurants_id
        ) AS rating, 
        (SELECT COUNT(id) from reviews where reviews.restaurants_id = restaurants.id) AS review_amount
        FROM restaurants`)).rows;
        return res.status(200).json({
            status: "success",
            results: getAllRestaraunts.length,
            data: {
                restaurants: getAllRestaraunts
            },
        })
    } catch (error) {
        console.log(error)
    }

})

app.get(commonApiRoute + "/restaurants/:id", async (req, res) => {
    try {
        const getOneRestaraunt = (await db.query(`SELECT * from restaurants where id=$1`, [req.params.id])).rows;

        return res.status(200).json({
            status: "success",
            results: getOneRestaraunt.length,
            data: {
                restaurants: getOneRestaraunt
            }
        })
    } catch (error) {
        console.log(error)
    }

})

app.post(commonApiRoute + "/restaurants", async (req, res) => {
    try {
        const setOneRestaraunt = await db.query("INSERT INTO restaurants (name,location,price_range) VALUES($1,$2,$3)", [
            req.body.name,
            req.body.location,
            req.body.price_range
        ]);

        console.log(setOneRestaraunt);
        return res.status(201).json({
            status: "success"
        })

    } catch (error) {
        console.log(error)
    }
})


app.put(commonApiRoute + "/restaurants/:id/update", async (req, res) => {
    try {
        const updateRestaraunt = await db.query("UPDATE restaurants SET name=$2, location=$3, price_range=$4 WHERE id=$1", [
            req.params.id,
            req.body.name,
            req.body.location,
            req.body.price_range]);

        console.log(updateRestaraunt);
        return res.status(201).send({
            status: "success"
        })
    } catch (error) {
        console.log(error)
    }
})

app.delete(commonApiRoute + "/restaurants/:id", async (req, res) => {
    try {
        const deleteRestaurant = await db.query("DELETE FROM restaurants where id=$1", [req.params.id])

        console.log(deleteRestaurant);
        return res.status(204).json({
            status: "success"
        })
    } catch (error) {
        console.log(error)
    }

})

//*****************REVIEWS API*********************/

app.get(commonApiRoute + "/restaurants/:id/reviews", async (req, res) => {
    try {
        const getReviews = (await db.query("SELECT restaurants.name as restaurant_name, reviews.id as id, reviews.name as name, reviews.rating as rating, reviews.review as review, reviews.restaurants_id as restaurants_id FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurants_id WHERE restaurants_id=$1", [req.params.id])).rows;
        console.log(getReviews);
        return res.status(200).json({
            status: "success",
            results: getReviews.length,
            reviews: getReviews

        })
    } catch (error) {
        console.log(error)
    }
})

app.post(commonApiRoute + "/restaurants/:id/reviews", async (req, res) => {
    try {
        const postReview = await db.query("INSERT INTO reviews (name,review,rating,restaurants_id) VALUES ($1,$2,$3,$4)", [
            req.body.name,
            req.body.review,
            req.body.rating,
            req.params.id])

        console.log(postReview);
        return res.status(201).json({
            status: "sucess"
        })
    } catch (error) {
        console.log(error)

    }
})
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})


