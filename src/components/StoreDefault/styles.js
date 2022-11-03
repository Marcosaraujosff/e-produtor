import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
flex: 1;
`;

export const Header = styled.View`
background-color: #64943f;
height: 90px;
`;

export const Input = styled.TextInput `
width: 98%;
background-color: #FFF;
margin-top: 3%;
margin-left: 4.3px;
padding: 3px;
padding-left: 10px;
border-radius: 8px;
font-size: 15px;
`;

export const ButtonSearch = styled.TouchableOpacity`
position: absolute;
margin-top: 13%;
margin-left: 90%;
z-index: 99;
`;

export const Store = styled.Text`
color: #FFF;
font-size: 23px;
padding-top: 2%;
margin-left: 4.3px;
font-weight: bold;
`;
export const ButtonsFavoritesView = styled.View`
height: 90px;
background-color: #F5F5;
`;

export const ButtonStore = styled.TouchableOpacity`
position: absolute;
background-color: #F5F5F5;
width: 75px;
height: 70px;
margin-top: 2%;
margin-left: 3%;
border-radius: 50px;
align-items: center;
justify-content: center;
`;

export const ButtonPlus = styled.TouchableOpacity`
position: absolute;
background-color: #F5F5F5;
width: 40px;
height: 80px;
margin-top: 2%;
margin-left: 73%;
border-radius: 50px;
align-items: center;
justify-content: center;
`;