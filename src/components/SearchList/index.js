import React from "react";

import { useNavigation } from '@react-navigation/native';

import { Container, UserName } from './styles';

function SearchList({ data }) {

    const navigation = useNavigation();

    return (
        <Container onPress={ () => navigation.navigate("PostsUser", {title: data.nome, userId: data.id})}>
            <UserName>{data.nome}</UserName>
        </Container>
    )
}

export default SearchList;