import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
width: 100%;
background-color: #353840;
align-items: center;
justify-content: center;
padding-top: 15px;
border-bottom-width: 1px;
border-bottom-color: #C7C7C7;
`;

export const Title = styled.Text`
color: #fff;
font-size: 32px;
font-weight: bold;
padding-bottom: 15px;
`;

export const ButtonProfile = styled.TouchableOpacity`
position: absolute;
right: 5%;
`;

export const ButtonNotification = styled.TouchableOpacity`
position: absolute;
right: 18%;
`;