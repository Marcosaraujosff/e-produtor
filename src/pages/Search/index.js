import React, { useState, useEffect } from "react";

import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather';

import {
  Container
  , Input
  , AreaUnput
  , List
} from './styles';

import SearchList from "../../components/SearchList";

function Search() {

  const [inputSearch, setInputSearch] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (inputSearch === '' || inputSearch === undefined) {
      setUsers([]);

      return;
    }

    const subscriber = firestore().collection('users')
      .where('nome', '>=', inputSearch)
      .where('nome', '<=', inputSearch + "\uf8ff")
      .onSnapshot(snapshot => {

        const listusers = [];

        snapshot.forEach(doc => {
          listusers.push({
            ...doc.data(),
            id: doc.id
          })
        })
        setUsers(listusers)
      })

    return () => subscriber();

  }, [inputSearch])

  return (
    <Container>
      <AreaUnput>
        <Feather
          name="search"
          size={20}
          color="#64943f"
        />
        <Input
          placeholder="Pesquise pessoas, lojas, produtos.."
          value={inputSearch}
          onChangeText={(text) => setInputSearch(text)}
        />
      </AreaUnput>

      <List
        data={users}
        renderItem={({ item }) => <SearchList data={item} />}  // Falta colocar uma verificação, para caso não encontrar, exibir uma mensagem dizendo que não foi encontrado dados com aquela pesquisa.
      />

    </Container>
  );
}

export default Search;