import React from "react";
import { Text } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import Feather from 'react-native-vector-icons/Feather';

import { Container, Title, ButtonProfile, ButtonNotification } from './styles';

function Header() {

    const navigation = useNavigation();

    return (
        <Container>
            <Title>+ 
                <Text style={{ color: '#77DD77' }}>Produtor</Text>
            </Title>
            <ButtonProfile
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Profile")}
            >
                <Feather
                    name="user"
                    size={26}
                    color="#FFF" />
            </ButtonProfile>
            <ButtonNotification
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Notification")}
            >
                <Feather
                    name="bell"
                    size={26}
                    color="#FFF" />
            </ButtonNotification>

        </Container>
    )
}

export default Header;