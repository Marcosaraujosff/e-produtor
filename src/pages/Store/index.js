import React, { useContext } from "react";

import Header from "../../components/Header"

import {
    Text

} from 'react-native';

import {
    Container
    , TextDemonstration
    , TitlePage

} from './styles'

import { AuthContext } from '../../contexts/auth';

function Store() {

    const { user } = useContext(AuthContext);

    console.log(user);

    return (
        <Container>
            <Header />

            <TitlePage>
            <TextDemonstration>Seja bem vindo <Text style={{color: '#64943f'}}>{user?.nome}</Text></TextDemonstration>
            </TitlePage>
        </Container>
    )
}

export default Store;

