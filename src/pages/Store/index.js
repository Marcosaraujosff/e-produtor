import StoreDefault from "../../components/StoreComponents/StoreDefault";

import React, { useContext } from "react";

import {
    Container
} from './styles'

import { AuthContext } from '../../contexts/auth';

function Store() {

    const { user } = useContext(AuthContext);

    console.log(user);

    return (
        <Container>
            <StoreDefault />
        </Container>
    )
}

export default Store;

