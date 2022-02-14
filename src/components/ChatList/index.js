import React from "react";
import {
    View
    , Text

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
    Container
    , RowView
    , ContentView
    , HeaderView
    , NameChat
    , TextLastMessage
} from './styles';

function ChatList({ data, deleteChat }) {

    const navigation = useNavigation();
    // Navegar até as mensagens do chat especifico.
    function openMessages(){
        navigation.navigate("Messages", {thread: data})
    }

    return (
        <Container onPress={ openMessages } onLongPress={ () => deleteChat && deleteChat() }>
            <RowView>
                <ContentView>
                    <HeaderView>
                        <NameChat numberOfLines={1}>{data.name}</NameChat>
                    </HeaderView>
                    <TextLastMessage numberOfLines={1}>{data.lastMessage.text}</TextLastMessage>
                </ContentView>
            </RowView>
        </Container>

    )
}

export default ChatList;
