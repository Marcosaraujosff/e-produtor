import React, { useContext, useState, useEffect } from "react";

import { Modal, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';

import { launchImageLibrary } from 'react-native-image-picker';

import Header from "../../components/Header";
import { AuthContext } from '../../contexts/auth';
import {
  Container
  , Name
  , Email
  , Button
  , ButtonText
  , UploadButton
  , UploadText
  , Avatar
  , ButtonBack
  , ModalContainer
  , Input

} from './styles';

function Profile() {

  const { signOut, user, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.nome);
  const [url, setUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    let isActive = true;

    async function loadPicture() {
      try {
        if (isActive) {
          let response = await storage().ref('users').child(user?.uid).getDownloadURL();
          setUrl(response);
        }
      } catch (error) {
        console.log("Nenhuma foto foi encontrada");
      }
    }

    loadPicture();

    return () => isActive = false;
  }, [])

  async function handleSignOut() {
    await signOut();
  }

  async function updateProfile() {
    // Verificar se foi digitado algo.
    if (name === '') {
      return;
    }

    await firestore().collection('users')
      .doc(user?.uid)
      .update({
        nome: name
      })

    // Buscar as publicações do user e atualizar o nome também.
    const postDocs = await firestore().collection('posts')
      .where('userId', '==', user?.uid).get();

    // Percorrer as publicações e atualizar.
    postDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id)
        .update({
          autor: name
        })
    })

    // Atualizar as informações para o AuthContext.

    let data = {
      uid: useState.uid,
      nome: name,
      email: user.email,
    }

    setUser(data);
    storageUser(data);
    setOpenModal(false);

  }

  const uploadPicture = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    };

    launchImageLibrary(options, response => {
      // Verificar se deu erro ou usuario saiu da tela.
      if (response.didCancel) {
        console.log("cancelou");
      } else if (response.error) {
        console.log("ops, parece que algo deu errado.")
      }
      else {
        // Subir a alteração pro db
        uploadPictureDb(response)
          .then(() => {
            uploadPicturePosts();
          })

        setUrl(response.assets[0].uri)
      }
    })
  }

  const uploadPictureDb = async (response) => {
    const fileSource = getFilePath(response);

    const storageRef = storage().ref('users').child(user?.uid);

    return await storageRef.putFile(fileSource)

  }

  const getFilePath = (response) => {
    // Extrair e retornar a url da foto.

    return response.assets[0].uri;
  }

  const uploadPicturePosts = async () => {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef.getDownloadURL()
      .then(async (image) => {
        // Atualizar todas imagens das publicações desse usuario.
        const postDocs = await firestore().collection('posts')
          .where('userId', '==', user.uid).get();

        // Percorrer as publicaçoes e atualizar a url

        postDocs.forEach(async m => {
          await firestore().collection('posts').doc(m.id).update({
            avatarUrl: image
          })
        })
      }).catch((error) => {
        alert('Erro ao atualizar a foto.', error)
      })
  }

  return (
    <Container>
      <Header />

      {url ? (
        <UploadButton onPress={() => uploadPicture()} >
          <UploadText> + </UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => uploadPicture()}>
          <UploadText> + </UploadText>
        </UploadButton>
      )}


      <Name> {user?.nome} </Name>
      <Email> {user?.email} </Email>

      <Button bg="#64943f" onPress={() => setOpenModal(true)}>
        <ButtonText color="#FFF">Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#DDD" onPress={handleSignOut} >
        <ButtonText color="#353840">Sair</ButtonText>
      </Button>

      <Modal visible={openModal} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpenModal(false)}>
            <Feather
              name="arrow-left"
              size={22}
              color="#121212"
            />
            <ButtonText color="#121212" > Voltar </ButtonText>
          </ButtonBack>

          <Input
            placeholder={user?.nome}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Button bg="#64943f" onPress={updateProfile} >
            <ButtonText color="#353840">Salvar</ButtonText>
          </Button>


        </ModalContainer>
      </Modal>

    </Container>
  );
}

export default Profile;