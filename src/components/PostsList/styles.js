import styled from "styled-components/native";

export const Container = styled.View`
margin-top: 8px;
margin: 8px 2%;
background-color: #FFF;
border-radius: 8px;
padding: 11px;
`;

export const Header = styled.TouchableOpacity`
width: 100%;
flex-direction: row;
align-items: center;
margin-bottom: 5px;
`;


export const Name = styled.Text`
color: #353840;
font-size: 18px;
font-weight: bold;
`;

export const Avatar = styled.Image`
width: 40px;
height: 40px;
border-radius: 20px;
margin-right: 6px;
`;

export const Content = styled.Text`
color: #353840;
margin: 4px 0;
`;

export const ContentView = styled.View`

`;

export const Actions = styled.View`
flex-direction: row;
align-items: baseline;
justify-content: space-between;
margin-top: 8px;
`;

export const Like = styled.Text`
color: #E54226;
margin-right: 6px;
`;

export const LikeButtom = styled.TouchableOpacity`
width: 45px;
flex-direction: row;
align-items: center;
justify-content: flex-start;
`;

export const TimePost = styled.Text`
color: #121212;
`;

