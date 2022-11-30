import React from "react";

import Header from "../../components/Header";
import QuotesCCCV from "../../components/Quotescccv";

import {
    Container
} from './styles';

function Quotes() {

    const text = "cotação";
    const title = text.toUpperCase();

    return (
        <Container>
            <Header/>
            <QuotesCCCV />

        </Container>
    )
}
export default Quotes;