import React, { useState, createContext, useEffect } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api'

export const AuthContext = createContext({});

function AuthProvider({ children }) {


    const [loadingAuth, setLoadingAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState("")

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@eapp');
            let hasUser = JSON.parse(storageUser || '{}');

            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
            }

            if (storageUser) {
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
                setLoading(false)
            }

            setLoading(false)
        }

        loadStorage();
    }, [])

    async function signUp(data) {

        setLoadingAuth(true);

        try {

            const response = await api.post('/register', data)

            const dataUser = {
                ...response.data
            }

            setUser(dataUser);
            storageUser(dataUser);
            setLoadingAuth(false);

        } catch (error) {
            alert("ops, algo deu errado..")
            setLoadingAuth(false);
        }


        // A codificação abaixo, sera descontinuada, ao fim das migrações para o backend.

        /*  await auth().createUserWithEmailAndPassword(email, password)
              .then(async (value) => {
                  let uid = value.user.uid;
                  await firestore().collection('users')
                      .doc(uid).set({
                          name: name,
                          createdAt: new Date(),
                      })
                      .then(() => {
                          let data = {
                              uid: uid,
                              name: name,
                              email: value.user.email
                          }
  
                          setUser(data);
                          storageUser(data);
                          setLoadingAuth(false);
                      })
              })
              .catch((Error) => {
                  alert(Error);
                  setLoadingAuth(false);
              })  */
    }
    async function signIn(email, password) {

        const data = {
            email,
            password
        }

        try {

            const response = await api.post('/login', data)

            const { token } = response.data;

            const dataAsync = {
                ...response.data
            }

            console.log(dataAsync)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser(dataAsync);
            storageUser(dataAsync);
            setLoadingAuth(false);

        } catch (error) {
            console.log("erro", error)
            setLoadingAuth(false)
        }

        // A codificação abaixo, sera descontinuada, ao fim das migrações para o backend.

        /*   setLoadingAuth(true)
   
           await auth().signInWithEmailAndPassword(email, password)
               .then(async (value) => {
                   let uid = value.user.uid;
   
                   const userProfile = await firestore().collection('users')
                       .doc(uid).get()
   
                   let data = {
                       uid: uid,
                       nome: userProfile.data().nome,
                       email: value.email
                   };
   
                   setUser(data);
                   storageUser(data);
                   setLoadingAuth(false);
               })
               .catch((error) => {
                   alert(error)
                   setLoadingAuth(false)
               })  */

    }
    async function signOut() {

        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('@eapp', JSON.stringify(data))
    }

    async function detailUser() {

        try {

           const response = await api.get('/me')

           console.log(response.data)

            setDetail(response.data);

        } catch (error) {
            console.log('vish, deu erro', error)
        }
    }

    async function updateUserProfile(data) {

        console.log(data)
        
        try {

            const response = await api.put('/update/profile', data)

            console.log(response.data)
            
        } catch (error) {
            console.log("erro: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user
            , signUp
            , signIn
            , signOut
            , loadingAuth
            , loading
            , user
            , setUser
            , storageUser
            , updateUserProfile
            , detail
            , detailUser

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;