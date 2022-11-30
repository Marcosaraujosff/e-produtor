import React from 'react';

import {
    Container
    , Image
} from './styles'

function CarouselCardItem({ item }) {
    return (
        <Container>
            <Image
                source={{ uri: item.imgUrl }}
            />
        </Container>
    )
}

export default CarouselCardItem;