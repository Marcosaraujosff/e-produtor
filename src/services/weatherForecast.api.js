import axios from "axios";

const apiForecast = axios.create({
    baseURL:'https://api.hgbrasil.com/weather?woeid=457642'
})

export { apiForecast }