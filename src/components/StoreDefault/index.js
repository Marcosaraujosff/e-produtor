import { Text } from "react-native"

import React, { useState, useContext, useCallback } from "react";
import { ActivityIndicator, View } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

import PostList from '../../components/PostsList';


import {
    Container
    , Header
    , Input
    , ButtonSearch
    , Store
    , ButtonsFavoritesView
    , ButtonStore
    , ButtonPlus

} from './styles';

function StoreDefault() {

    const [search, setSearch] = useState("")

    function SearchResults() {
        console.log("Clicou")
    }

    return (
        <Container>
            <Header>
                <Store>Loja</Store>
                <Input
                    placeholder="O que deseja encontrar?"
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
            <ButtonsFavoritesView>
                <ButtonStore>
                    <Feather
                        name="shopping-cart"
                        color="#000"
                        size={25}
                    />
                </ButtonStore>
                <ButtonPlus>
                    <Feather
                        name="plus"
                        color="#000"
                        size={25}
                    />
                </ButtonPlus>
            </ButtonsFavoritesView>
        </Container>
    )
}

export default StoreDefault;