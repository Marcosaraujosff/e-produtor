import React, { useContext } from "react";

import {
    Text
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

import { AuthContext } from '../../contexts/auth';

import { api } from "../../services/api";

import {
    Container
    , ButtonCommodities
    , ButtonSchedule
    , ButtonForecast
    , ButtonCalculator
    , ButtonWallet
    , TextWallet

} from './styles';

function MoreFunctions() {

    const { user } = useContext(AuthContext);

    const navigation = useNavigation();



    return (
        <Container>
            <Header />
            <ButtonCommodities
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Quotes")}
            >
                <MaterialCommunityIcons
                    name="finance"
                    color="#FFF"
                    size={40}
                />
            </ButtonCommodities>

            <ButtonSchedule
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Schedule")}
            >
                <MaterialCommunityIcons
                    name="book-account"
                    color="#FFF"
                    size={40}
                />
            </ButtonSchedule>

            <ButtonForecast
                activeOpacity={0.7}
                onPress={() => navigation.navigate("WeatherForecast")}
            >
                <MaterialCommunityIcons
                    name="weather-partly-rainy"
                    color="#FFF"
                    size={40}
                />
            </ButtonForecast>

            <ButtonCalculator
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Calculator")}
            >
                <MaterialCommunityIcons
                    name="calculator"
                    color="#FFF"
                    size={40}
                />
            </ButtonCalculator>

            <ButtonWallet
                activeOpacity={1}
            >
                <MaterialCommunityIcons
                    name="wallet-travel"
                    color="#b5b5b5"
                    size={40}
                />
            </ButtonWallet>
            <TextWallet>Em breve</TextWallet>


        </Container>
    )
}

export default MoreFunctions;
