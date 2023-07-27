import axios from "axios";
const baseURL =
    import.meta.env.PROD === true
        ? "/api/v1/restaurants"
        : "http://localhost:4000/api/v1/restaurants"



export default axios.create({
    baseURL
});