import React, { useState, useEffect, useContext } from "react";

import {
  SafeAreaView
  , FlatList
  , Modal
  , ActivityIndicator
  , Alert
} from 'react-native';

import { useIsFocused } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

import Header from "../../components/Header";
import ModalNewGroup from "../../components/ModalNewGroup";
import ButtonNewTab from "../../components/ButtonNewTab";
import ChatList from "../../components/ChatList";
import { AuthContext } from "../../contexts/auth";


function Chat() {

  const { user } = useContext(AuthContext)

  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('lastMessage.createdAt', 'desc') 
        .limit(10)
        .get()
        .then((snapshot) => {
          const threads = snapshot.docs.map(m => {
            return {
              _id: m.id,
              name: '',
              lastMessage: { text: '' },
              ...m.data(),
            }
          })
          if (isActive) {
            setThreads(threads);
            setLoading(false);
          }
        })
    }

    getChats();

  }, [isFocused, updateScreen])

  if (loading) {
    <ActivityIndicator size="large" color="#555" />
  }

  function deleteChat(ownerId, idChat) {
    if (ownerId !== user?.uid) 
      return;

    Alert.alert(
      "Atenção!",
      "Tem certeza que deseja excluir permanentemente essa sala?",
      [
        {
          text: "Cancelar",
          onPress: () => { },
          style: "cancel",
        },

        {
          text: "Excluir",
          onPress: () => handleDeleteChat(idChat),
          style: "default",
        }
      ]
    )

  }
  async function handleDeleteChat(idChat) {
    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(idChat)
      .delete()

    setUpdateScreen(!updateScreen);

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header 
        
      />

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatList data={item} deleteChat={() => deleteChat(item.owner, item._id)} />
        )}
      />

      <ButtonNewTab setVisible={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewGroup
          setVisible={() => setModalVisible(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>

    </SafeAreaView>
  );
}

export default Chat;