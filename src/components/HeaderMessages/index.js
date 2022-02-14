import React from "react";
import { Text } from 'react-native';

import { Container, Title } from './styles';

function HeaderMessages({ data, route }) {

    const { thread } = route.params;

    console.log(thread)

    return (
        <Container>
            <Title>
            <Text style={{color: '#77DD77'}}>aaaaa</Text>
            </Title>
        </Container>
    )
}

export default HeaderMessages;