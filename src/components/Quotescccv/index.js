import React, { useState, useEffect } from "react";
import { format, setDate } from 'date-fns';

import { api } from "../../services/api";

import {
    Container
    , ContainerArabica
    , TextArabica
    , ContainerConilon
    , TextConilon
    , ContainerContentTypeD
    , TextContentTypeD
    , ContainerContentTypeR
    , TextContentTypeR
    , ContainerContentTypeC
    , TextContentTypeC
    , ContainerDay
    , Day
    , ContainerValueD
    , ValueD
    , ContainerValueR
    , ValueR
    , ContainerValueC
    , ValueC
    , ContainerFont
    , Font
    , QuotesText
    , ContainerText
} from './styles';

function QuotesCCCV() {

    const text = "cotação café";
    const title = text.toUpperCase();

    const [data, setData] = useState("");

    useEffect(() => {
        async function getValues() {

            await api.get('/coffee')
                .then((response) => {
                    setData(response.data)
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log("deu ruim" + err)
                })
        }

        getValues();

    }, []);

    return (
        <Container>

            <ContainerText>
                <QuotesText>{title}</QuotesText>
            </ContainerText>
            <ContainerDay>
                <Day>{data?.dateParams}</Day>
            </ContainerDay>
            <ContainerArabica>
                <TextArabica>ARÁBICA</TextArabica>
            </ContainerArabica>
            <ContainerContentTypeD>
                <TextContentTypeD>Bebida “dura”, bica corrida, max. de 20%
                    de “cata”, min. de 30% de peneira 17 acima</TextContentTypeD>
            </ContainerContentTypeD>
            <ContainerValueD>
                <ValueD>{data?.type_Dura}</ValueD>
            </ContainerValueD>
            <ContainerValueR>
                <ValueR>{data?.type_Rio}</ValueR>
            </ContainerValueR>
            <ContainerValueC>
                <ValueC>{data?.type_7_8}</ValueC>
            </ContainerValueC>
            <ContainerContentTypeR>
                <TextContentTypeR>Bebida “rio”, bica corrida, max. de 30%
                    de “cata”, min. de 30% de peneira 17 acima</TextContentTypeR>
            </ContainerContentTypeR>
            <ContainerConilon>
                <TextConilon>CONILON</TextConilon>
            </ContainerConilon>
            <ContainerContentTypeC>
                <TextContentTypeC>Bica corrida, tipo 7/8, com até 13% de umidade
                    e até 5% de broca</TextContentTypeC>
            </ContainerContentTypeC>

            <ContainerFont>
                <Font>Fonte: CCCV - Centro do comercio de café de vitoria</Font>
            </ContainerFont>
        </Container>
    )
};

export default QuotesCCCV;