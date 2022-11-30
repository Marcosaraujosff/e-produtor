import React, { useState, useLayoutEffect, useContext } from "react";

import { AuthContext } from '../../contexts/auth'

import { useNavigation } from '@react-navigation/native';
import { Container, Input, ButtonText, Button } from './styles'

import { api } from "../../services/api";
import { id } from "date-fns/locale";

function Newpost() {

  const navigation = useNavigation();

  const [post, setPost] = useState("");

  const { user } = useContext(AuthContext);

  useLayoutEffect(() => {

    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      ),
    })

  }, [navigation, post])

  async function handlePost() {
    if (post === '') {
      alert("Digite algo para ser publicado.");
      return;
    }

    let avatarUrl = null;

    try {

      let response = await api.get('/me');

      avatarUrl = response?.data?.avatarUrl;

    } catch (error) {
      avatarUrl = null;
    }

    const data = {
      created: new Date(),
      content: post,
      autor: user?.name,
      userId: user?.id,
      likes: '0',
      avatarUrl: avatarUrl
    }

    try {

      const response = await api.post('newPost', data)

      setPost('')

    } catch (error) {
      console.log("erro :", error);
      throw new error("Erro ao registrar dados.")
    }

    navigation.goBack()
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