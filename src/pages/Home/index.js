import React, { useState, useContext, useCallback } from "react";
import { Text, ActivityIndicator, View } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

import { Container, ButtonPost, ListPosts } from './styles';
import Header from "../../components/Header";
import { AuthContext } from '../../contexts/auth';
import PostList from '../../components/PostsList';

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
        firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
          .then((snapshot) => {

            if (isActive) {
              setPosts([]);
              const postList = [];

              snapshot.docs.map(p => {
                postList.push({
                  ...p.data(),
                  id: p.id,
                })
              })

              setEmptyList(!!snapshot.empty);
              setPosts(postList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);  // Seta qual ultima publicação renderizada.
              setLoading(false);
            }
          })
      }

      fetchPosts();

      return () => {
        isActive = false;
      }

    }, [])
  )

    //Buscar mais pubicações quando usuario atualizar a pagina.
  async function handleRefreshPost() {
    setLoadingRefresh(true);

    firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
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
          setLastItem(snapshot.docs[snapshot.docs.length - 1]);  // Seta qual ultima publicação renderizada.
          setLoading(false);
      })
      setLoadingRefresh(false);

  }

   // Buscar mais publicações ao chegar no final da lista no home.
  async function getListPosts(){
    if(emptyList){
      setLoading(false);
      return null;
    }                                // Se a lista estiver vazia, parar a execução do loading
    if(loading) 
    return;

    firestore().collection('posts')
    .orderBy('created', 'desc')
    .limit(5)
    .startAfter(lastItem)
    .get()
    .then( (snapshot) => {
      const postList = [];

      snapshot.docs.map( m => {
        postList.push({
          ...m.data(),
          id: m.id,
        })
      })

      setEmptyList(!!snapshot.empty)
      setLastItem(snapshot.docs[snapshot.docs.length -1])
      setPosts(oldPosts => [...oldPosts, ...postList]);
      setLoading(false);
    })

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
              userId={user?.uid}
            />

          )}

          refreshing={loadingRefresh}  // Controla quando será exibido o loading na tela.
          onRefresh={handleRefreshPost}  // Chama a função que busca publicações atualizadas.

          onEndReached={ () => getListPosts() }  // Chama a função para buscar mais posts
          onEndReachedThreshold={0.1}  // Determinar quando começar a carregar novos posts pra renderizar.

        />
        )}


      <ButtonPost
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Feather
          name="edit-2"
          color="#FFF"
          size={25}
        />
      </ButtonPost>
    </Container>
  );

}

export default Home;