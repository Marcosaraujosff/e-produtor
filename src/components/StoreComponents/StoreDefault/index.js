import React, { useState } from "react";
import { Dimensions } from "react-native";

import { Text } from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppIntroSlider from "react-native-app-intro-slider";

import CarouselCardItem from "../Carousel/CarouselCardItem";

import {
    Container
    , Header
    , Input
    , ButtonSearch
    , Store
    , ShoppingCart
    , ContainerCarousel
    , ContainerOptions
    , ButtomOptionOne
    , ButtomOptionTwo
    , ButtomOptiontTree
    , ButtomOptionFour
    , ButtomOptionFive
    , ContainerText


} from './styles';

const carouselItems = [
    {
        key: "1",
        imgUrl: 'https://wowslider.com/sliders/demo-80/data1/images/sheet546475_1920.jpg'
    },
    {
        key: "2",
        imgUrl: 'https://wowslider.com/sliders/demo-77/data1/images/field175959_1920.jpg'
    },
    {
        key: "3",
        imgUrl: 'https://wowslider.com/sliders/demo-77/data1/images/tuscany428041.jpg'
    }
]

function StoreDefault() {

    const [search, setSearch] = useState("")

    function SearchResults() {
        console.log("Clicou")
    }

    function Cart() {
        console.log("Clicou")
    }

    return (
        <Container>
            <Header>
                <Store>Loja</Store>
                <ShoppingCart
                    activeOpacity={0.7}
                    onPress={Cart}
                >
                    <Ionicons
                        name="ios-cart-outline"
                        color="#FFF"
                        size={30}
                    />
                </ShoppingCart>
                <Input
                    placeholder="Buscar na loja"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
                <ButtonSearch
                    activeOpacity={0.7}
                    onPress={SearchResults}
                >
                    <Feather
                        name="search"
                        color="#000"
                        size={25}
                    />
                </ButtonSearch>
            </Header>
            <ContainerCarousel>
                <AppIntroSlider
                    renderItem={CarouselCardItem}
                    data={carouselItems}
                    activeDotStyle={{
                        backgroundColor: '#7EA65F'
                    }}
                    showNextButton={false}
                    showDoneButton={false}
                />
            </ContainerCarousel>
            <ContainerOptions>
                <ButtomOptionOne />
                <ButtomOptionTwo />
                <ButtomOptiontTree />
                <ButtomOptionFour />
                <ButtomOptionFive />
            </ContainerOptions>

            <ContainerText>
                <Text style={{ color: '#64943F', fontSize: 20 }}>PARA VOCÊ</Text>
            </ContainerText>
        </Container>
    )
}

export default StoreDefault;