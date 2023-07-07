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

