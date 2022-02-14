import React from "react";

import Feather from 'react-native-vector-icons/Feather';

import { ButtonChat } from './styles';

function ButtonNewTab({ setVisible }) {

    function handleNavigateButton(){
        setVisible()
    }

    return (
        <ButtonChat
            activeOpacity={0.7}
            onPress={ handleNavigateButton }
        >
            <Feather
                name="plus"
                color="#FFF"
                size={25}
            />
        </ButtonChat>
    )
}

export default ButtonNewTab;