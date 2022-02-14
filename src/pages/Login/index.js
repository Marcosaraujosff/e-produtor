import React, { useState, useContext} from "react";

import { ActivityIndicator, Image } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { 
    Container
  , Input
  , ButtonText
  , Button
  , SignUpButton
  , SignUpText 
        } from "./styles";

import { AuthContext } from '../../contexts/auth';

const LogoAnimated = Animatable.createAnimatableComponent(Image)

function Login() {

  const [login, setLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const { signUp, signIn, loadingAuth } = useContext(AuthContext)

  function ToggleLogin(){
    setLogin(!login)  // Função para renderização condicional (Login ou Cadastrar)
    setName('')
    setPassword('')   // Manter sempre os campos vazios na renderização condiiconal
    setEmail('')
  }

  async function handleSignIn(){
    // verificar se todos dados estão preenchidos, e se nao estiverem, não ser possivel o login
    if(email === '' || password === ''){
      alert("Ops, os dados digitados não conferem..")
      return;
    }
    // Fazer o login do Usuario

    await signIn(email, password)

  }

  async function handleSignUp(){
    // verificar se todos dados estão preenchidos, e se nao estiverem, não ser possivel realizar o cadastro
    if(name === '' || email === '' || password === ''){
      alert("Favor preencher todos os dados para se cadastrar.")
      return;
    }

    // Cadastrar usuario na aplicação

    await signUp(email, password, name)
  }

  if(login){
  return (
    <Container>
      <LogoAnimated animation="zoomIn"
        source={require('../../assets/logo.png')}
        style={{ width: 300, height: 300 }}
      />

      <Input
        placeholder="example@example.com"
        value={email}
        onChangeText={ (text) => setEmail(text)}
      />

      <Input
        placeholder="**********"
        value={password}
        onChangeText={ (text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button onPress={handleSignIn} > 
        {loadingAuth 
        ? (
          <ActivityIndicator size={20} color="#FFF" /> 
        )            
        : (
          <ButtonText>Acessar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={ToggleLogin} >
        <SignUpText>Criar uma conta</SignUpText>
      </SignUpButton>

    </Container>
  );
  }

  return (
    <Container>
      
      <LogoAnimated animation="pulse"
        source={require('../../assets/logo.png')}
        style={{ width: 300, height: 300 }}
      />
      
      

      <Input
        placeholder="Digite seu nome"
        value={name}
        onChangeText={ (text) => setName(text)}
      />

      <Input
        placeholder="Digite seu email"
        value={email}
        onChangeText={ (text) => setEmail(text)}
      />

      <Input
        placeholder="Crie uma senha"
        value={password}
        onChangeText={ (text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button onPress={handleSignUp} >
      {loadingAuth 
        ? (
          <ActivityIndicator size={20} color="#FFF" /> 
        )            
        : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={ToggleLogin} >
        <SignUpText>Ja possui uma conta?</SignUpText>
      </SignUpButton>

    </Container>
  );
}

export default Login;