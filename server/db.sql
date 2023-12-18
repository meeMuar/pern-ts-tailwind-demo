CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL,
    review_amount INT,
    rating NUMERIC
);


CREATE TABLE reviews( 
    id BIGSERIAL NOT NULL PRIMARY KEY, 
    name VARCHAR(50),
    review TEXT,
    rating INT NOT NULL check(rating >=1 and rating <=5),
    restaurants_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE
    );


UPDATE restaurants
SET rating = (
    SELECT trunc(AVG(rating),1)
    FROM reviews 
    WHERE restaurants.id = reviews.restaurants_id
);

ALTER TABLE restaurants
ALTER COLUMN review_amount
SET COUNT(id) from reviews where reviews.restaurants_id = restaurants.id;


SELECT 
restaurants.id,restaurants.name,restaurants.location,restaurants.price_range,(
    SELECT trunc(AVG(rating),1)
    FROM reviews 
    WHERE restaurants.id = reviews.restaurants_id
) AS rating, (SELECT COUNT(id) from reviews where reviews.restaurants_id = restaurants.id) AS review_amount
FROM restaurants;


SELECT restaurants.name as restaurant_name, reviews.id as id, reviews.name as name, reviews.rating as rating, reviews.review as review, reviews.restaurants_id as restaurants_id FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurants_id WHERE restaurants_id=$1
