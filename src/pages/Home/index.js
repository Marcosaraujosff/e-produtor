import React, { useState, useContext, useCallback } from "react";
import { ActivityIndicator, View } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

import { Container, ButtonPost, ListPosts } from './styles';
import Header from "../../components/Header";
import { AuthContext } from '../../contexts/auth';
import PostList from '../../components/PostsList';

import { api } from "../../services/api";

function Home() {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);   // Controla o refresh
  const [lastItem, setLastItem] = useState('');                  // Armazena o ultimo item renderizado na lista de publicações
  const [emptyList, setEmptyList] = useState(false);             // Controla se a lista de publicações esta vazia ou não

  useFocusEffect(
    useCallback(() => {

      let isActive = true;

      function fetchPosts() {


        api.get('/getPosts')
          .then((value) => {
            if (isActive) {
              setPosts([]);
              const postList = [];

              value.data.map(() => {
                postList.push({
                  ...value.data,
                }
                )
              })

              console.log(postList)

            }
          })

          .catch((error) => {
            console.log(error)
          })


        /* firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
           .then((snapshot) => {
 
             if (isActive) {
               setPosts([]);
               const postList = [];
 
               snapshot.docs.map(m => {
                 postList.push({
                   ...m.data(),
                   id: m.id,
                 })
               })
 
               setEmptyList(!!snapshot.empty);
               setPosts(postList);
               setLastItem(snapshot.docs[snapshot.docs.length - 1]);  // Seta qual ultima publicação renderizada.
               setLoading(false);
             }
           })  */
      }

      fetchPosts();

      return () => {
        isActive = false;
      }

    }, [])
  )

  async function handleRefreshPost() {
    setLoadingRefresh(true);

    api.get('/getPosts')
      .then((value) => {
        if (isActive) {
          setPosts([]);
          const postList = [];

          value.data.map(() => {
            postList.push({
              ...value.data,
            }
            )
          })

          setEmptyList(false);
          setPosts(postList);
          setLastItem(value.data[value.data.length - 1]);
          console.log(setLastItem)
          setLoading(false);

        }
      })

      .catch((error) => {
        console.log(error)
      })

    setLoadingRefresh(false);

    /* firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
       .then((snapshot) => {
 
         setPosts([]);
         const postList = [];
 
         snapshot.docs.map(p => {
           postList.push({
             ...p.data(),
             id: p.id,
           })
         })  
 
         setEmptyList(false);
         setPosts(postList);
         setLastItem(snapshot.docs[snapshot.docs.length - 1]);
         setLoading(false);
       }) */


  }

  async function getListPosts() {
    if (emptyList) {
      setLoading(false);
      return null;
    }
    if (loading)
      return;

    api.get('/getPosts')
      .then((value) => {
        if (isActive) {
          setPosts([]);
          const postList = [];

          value.data.map(() => {
            postList.push({
              ...value.data,
            }
            )
          })

          console.log(postList)

        }
      })

      .catch((error) => {
        console.log(error)
      })

    setEmptyList(!!snapshot.empty)
   // setLastItem(snapshot.docs[snapshot.docs.length - 1])
    //setPosts(oldPosts => [...oldPosts, ...postList]);
    setLoading(false);

    /* firestore().collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then((snapshot) => {
        const postList = [];

        snapshot.docs.map(m => {
          postList.push({
            ...m.data(),
            id: m.id,
          })
        })

        setEmptyList(!!snapshot.empty)
        setLastItem(snapshot.docs[snapshot.docs.length - 1])
        setPosts(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      })  */

  }

  return (
    <Container>
      <Header />

      {loading
        ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={50} color="#64943f" />
          </View>
        ) : (
          <ListPosts
            showsVerticalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => (
              <PostList
                data={item}
                userId={user?.id}
              />

            )}

            refreshing={loadingRefresh}
            onRefresh={handleRefreshPost}

            onEndReached={() => getListPosts()}
            onEndReachedThreshold={0.1}

          />
        )}


      <ButtonPost
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Feather
          name="edit"
          color="#FFF"
          size={25}
        />
      </ButtonPost>
    </Container>
  );

}

export default Home;