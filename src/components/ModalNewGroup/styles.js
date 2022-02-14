import styled from "styled-components";

export const Container = styled.View`
flex: 1;
background-color: rgba(34, 34, 34, 0.4);
`;

export const ModalContent = styled.View`
flex: 1;
background-color: #FFF;
padding: 15px;
`;

export const Title = styled.Text`
text-align: center;
font-weight: bold;
font-size: 19px;
margin-top: 14px;
`;

export const TextInput = styled.TextInput`
border-radius: 4px;
height: 45px;
background-color: #DDD;
margin-top: 20px;
padding: 12px;
font-size: 15px;
`;

export const ButtonCreate = styled.TouchableOpacity`
border-radius: 4px;
background-color: ${props => props.bg};
height: 45px;
align-items: center;
justify-content: center;
margin-top: 10px;
`;

export const ButtonTextCreate = styled.Text`
font-size: 19px;
font-weight: bold;
color: #FFF;
`;
