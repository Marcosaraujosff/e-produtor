import React, { useLayoutEffect, useState, useCallback, useContext} from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import PostsList from "../../components/PostsList";
import { Container, ListPosts } from './styles';
import { AuthContext } from '../../contexts/auth';

function Postsuser() {

  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(route.params?.title)
  const [publish, setPublish] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === ""
        ? ""
        : title
    })
  }, [navigation, title])

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      firestore().collection('posts')
        .where('userId', '==', route.params?.userId)
        .orderBy('created', 'desc')
        .get()
        .then((snapshot) => {
          const postList = [];

          snapshot.docs.map(m => {
            postList.push({
              ...m.data(),
              id: m.id
            })
          })
          if (isActive) {
            setPublish(postList);
            setLoading(false);
          }
        })

      return () => {
        isActive = false;
      }
    }, [])
  )

  return (
    <Container>
      {loading
        ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color="#64943f" />
          </View>
        ) : (
          <ListPosts
            showsVerticalScrollIndicator={false}
            data={publish}
            renderItem={ ({ item }) => <PostsList data={item} userId={user.uid}/> }
          > {route.params?.title} </ListPosts>
        )}
    </Container>
  );
}

export default Postsuser;