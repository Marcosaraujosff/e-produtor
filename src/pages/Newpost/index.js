import React, { useState, useLayoutEffect, useContext } from "react";

import { AuthContext } from '../../contexts/auth'

import { useNavigation } from '@react-navigation/native';
import { Container, Input, ButtonText, Button } from './styles'

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'

function Newpost() {

  const navigation = useNavigation();

  const [post, setPost] = useState("");

  const { user } = useContext(AuthContext);

  useLayoutEffect(() => {

    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post])

  async function handlePost() {
    if (post === '') {
      alert("Digite algo para ser postado");
      return;
    }

    let avatarUrl = null;

    try {
      let response = await storage().ref('users').child(user?.uid).getDownloadURL();  // Obtem as informações no banco se tem foto do perfil ou não.
      avatarUrl = response;

    } catch (err) {
      avatarUrl = null;
    }

    await firestore().collection('posts')
      .add({
        created: new Date(),
        content: post,
        autor: user?.nome,
        userId: user?.uid,
        likes: 0,
        avatarUrl,
      })
      .then(() => {
        setPost('')
      })
      .catch((error) => {
        alert('Erro ao criar a publicação', error)
      })

    navigation.goBack();
  }


  return (
    <Container>
      <Input
        placeholder="Digite o que deseja"
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#DDD"
        maxLength={300}
      />
    </Container>
  )
}

export default Newpost;