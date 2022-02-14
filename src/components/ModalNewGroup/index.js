import React, { useState } from "react";
import {
    View
    , TouchableWithoutFeedback
} from "react-native";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {
    Container
    , ModalContent
    , Title
    , ButtonCreate
    , ButtonTextCreate
    , TextInput
} from "./styles";

function ModalNewGroup({ setVisible, setUpdateScreen }) {

    const [nameChat, setNameChat] = useState('');

    const user = auth().currentUser.toJSON();  // Obtem as informações do usuario logado no app e retorna em JSON.


    function handleButtonCreate() {

        if (nameChat === '')
            return;

        // Validação para permitir cada user criar apenas 2 salas, para não ficar salas atoa consumindo memoria (caso ele apague alguma, libera para criar novas)
        firestore().collection('MESSAGE_THREADS')
            .get()
            .then( (snapshot) => {
                let appThreadsPerUser = 0;

                snapshot.docs.map(m => {
                    if (m.data().owner === user.uid){
                        appThreadsPerUser += 1;
                    }
                })
                if (appThreadsPerUser >= 2) {
                    alert('Voce ja atingiu o limite de salas, favor, para criar uma nova, apague uma que não está mais em uso.');
                }
                else {
                    createChat();
                }
            })
    }

    // Salvar sala/grupochat no db.
    function createChat() {
        firestore()
            .collection('MESSAGE_THREADS')
            .add({
                name: nameChat,
                owner: user.uid,
                lastMessage: {
                    text: `Grupo ${nameChat} criado, Bem vindo(a)!`,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                }
            })
            .then((docRef) => {
                docRef.collection('MESSAGES').add({
                    text: `Grupo ${nameChat} criado, Bem vindo(a)!`,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    system: true,
                })
                    .then(() => {
                        setVisible()  // Fechar o modal automaticamente.
                        setUpdateScreen();
                    })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container>

            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <ModalContent>
                <Title>Criar um novo grupo.</Title>
                <TextInput
                    value={nameChat}
                    onChangeText={(text) => setNameChat(text)}
                    placeholder="Nome da sala de networking"
                />

                <ButtonCreate bg="#64943f" onPress={handleButtonCreate}>
                    <ButtonTextCreate>Criar sala</ButtonTextCreate>
                </ButtonCreate>

                <ButtonCreate bg="#64943f" onPress={setVisible}>
                    <ButtonTextCreate>Voltar</ButtonTextCreate>
                </ButtonCreate>
            </ModalContent>
        </Container>
    )
}

export default ModalNewGroup;