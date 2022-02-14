import React, { useContext, useMemo } from "react";
import {
    View
}
    from 'react-native';

import {
    Container
    , MessageBox
    , NameUser
    , MessageText
} from './styles';

import { AuthContext } from '../../contexts/auth';

function MessagesChat({ data }) {

    console.log(data)

    const { user } = useContext(AuthContext);

    const myMessage = useMemo(() => {
        return data?.user?._id === user.uid

    }, [data])

    return (
        <Container>
            <MessageBox style={[{
                backgroundColor: myMessage ? '#DCF8C5' : '#FFF',
                marginRight: myMessage ? 0 : 50,
                marginLeft: myMessage ? 50 : 0,
            }]} >

                {!myMessage && <NameUser>{data?.user?.displayName}</NameUser>}

                <MessageText>{data.text}</MessageText>
            </MessageBox>
        </Container>
    )
}

export default MessagesChat;