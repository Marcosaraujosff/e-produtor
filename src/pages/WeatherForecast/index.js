import React from "react";

import Header from "../../components/Header"

import {
    View
    , Button

} from 'react-native';

import {
    Container
    , TextDemonstration
    , TitlePage

} from './styles'

import { apiForecast } from "../../services/weatherForecast.api";

function WeatherForecast() {

    async function retorno() {
        try {
            const response = await apiForecast.get('/coffee', {
                day,
                month
            })
            console.log(response)
        } catch (error) {
            console.log({ ...error })
        }
    }

    return (
        <View>
            <Header />

        </View>
    )
}

export default WeatherForecast;