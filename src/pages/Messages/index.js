import React, { useState, useEffect, useContext } from 'react';
import {
    FlatList
    , SafeAreaView
    , KeyboardAvoidingView
    , Platform
}
    from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../../contexts/auth';

import {
    ContainerInput
    , TextInput
    , MainContainerInput
    , ButtonSendMessages

}
    from './styles';

import MessagesChat from '../../components/MessagesChat';

function Messages({ route }) {

    const { thread } = route.params;

    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {

        const unsubscribeListener = firestore().collection('MESSAGE_THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(docs => {
                    const firebaseData = docs.data()


                    const data = {
                        _id: docs.id,
                        text: '',
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        ...firebaseData
                    }

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: user.nome,
                        }
                    }

                    return data;


                })

                setMessages(messages);
            })

        return () => unsubscribeListener();

    }, []);
    async function handleSendMessage() {
        if (textInput === '')
            return;

        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text: textInput,
                createdAt: firestore.FieldValue.serverTimestamp(),
                user: {
                    _id: user.uid,
                    displayName: user.nome
                }
            })

        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .set(
                {
                    lastMessage: {
                        text: textInput,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    }
                },
                {
                    merge: true
                }

            )

        setTextInput('');

    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <FlatList
                style={{ width: '100%' }}
                data={messages}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <MessagesChat data={item} />}
                inverted={true}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ width: '100%' }}
                keyboardVerticalOffset={100}
            >
                <ContainerInput>
                    <MainContainerInput>
                        <TextInput
                            placeholder="Digite sua mensagem ..."
                            value={textInput}
                            onChangeText={(text) => setTextInput(text)}
                            multiline={true}
                            autoCorrect={false}
                        />
                    </MainContainerInput>

                    <ButtonSendMessages onPress={handleSendMessage}>
                        <Feather
                            name="send"
                            size={22}
                            color="#FFF"
                        />
                    </ButtonSendMessages>
                </ContainerInput>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Messages;