import React, { useState } from "react";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import {
    Container
    , Name
    , Avatar
    , Header
    , Content
    , ContentView
    , Actions
    , Like
    , LikeButtom
    , TimePost
} from "./styles";

function PostsList({ data, userId }) {

    const navigation = useNavigation()
    const [likePost, setLikePost] = useState(data?.likes)


    return (
        <Container>
            <Header
                onPress={() => navigation.navigate("PostsUser", { title: data.autor, userId: data.userId })}
            >

                {data.avatarUrl ? (
                    <Avatar
                        source={{ uri: data.avatarUrl }}
                    />
                ) : (
                    <Avatar
                        source={require('../../assets/avatar.png')}
                    />
                )}

                <Name numberOfLines={1}>
                    {data?.autor}
                </Name>
            </Header>

            <ContentView>
                <Content>{data?.content}</Content>
            </ContentView>

            <Actions>
                <LikeButtom onPress={() => handleLikePost(data.id, likePost)} >
                    <Like>
                        {likePost === 0
                            ? ''
                            : likePost}
                    </Like>
                    <MaterialCommunityIcons
                        name={likePost === 0
                            ? "heart-plus-outline"
                            : "cards-heart"}
                        size={20}
                        color="#E52246"
                    />
                </LikeButtom>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>
        </Container>
    )

    async function handleLikePost(id, likes) {
        const docId = `${userId}_${id}`;

        const doc = await firestore().collection('likes')
            .doc(docId).get();

        // Verificar se o like ja foi dado pelo user, e se ja foi, dar deslike.
        if (doc.exists) {
            await firestore().collection('posts')
                .doc(id).update({
                    likes: likes - 1
                })

            await firestore().collection('likes').doc(docId)
                .delete()
                .then(() => {
                    setLikePost(likes - 1)
                })
            return;
        }

        // Se o like ainda não foi dado, realizar o like na publicação.

        await firestore().collection('likes')
            .doc(docId).set({
                postId: id,
                userId: userId
            })
        await firestore().collection('posts')
            .doc(id).update({
                likes: likes + 1
            })
            .then(() => {
                setLikePost(likes + 1)
            })

    }

    function formatTimePost() {
        const datePost = new Date(data.created.seconds * 1000);

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }
}

export default PostsList;