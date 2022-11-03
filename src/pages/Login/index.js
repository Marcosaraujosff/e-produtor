import React, { useState, useContext } from "react";

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
  const [cpf_cnpj, setCpf_cnpj] = useState("")
  const [city, setCity] = useState("")
  const [zipcode, setZipcode] = useState("")

  const { signUp, signIn, loadingAuth } = useContext(AuthContext)

  function ToggleLogin() {
    setLogin(!login)
    setName('')
    setPassword('')
    setEmail('')
  }

  async function handleSignIn() {

    if (email === '' || password === '') {
      alert("Ops, os dados digitados não conferem..")
      return;
    }

    await signIn(email, password)

  }

  async function handleSignUp() {

    if (name === '' || email === '' || password === '' || zipcode === '' || cpf_cnpj === '' || city) {

      alert("Favor preencher todos os dados para se cadastrar.")

      return;
    }

    const data = {
      email,
      password,
      name,
      zipcode,
      city,
      cpf_cnpj
    }

    await signUp(data)
  }

  if (login) {
    return (
      <Container>
        <LogoAnimated animation="pulse"
          source={require('../../assets/logo.png')}
          style={{ width: 300, height: 300 }}
        />

        <Input
          placeholder="example@example.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="**********"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <Button onPress={handleSignIn} >
          {loadingAuth
            ? (
              <ActivityIndicator size={20} color="#FFF" />
            )
            : (
              <ButtonText> Acessar </ButtonText>
            )}
        </Button>

        <SignUpButton onPress={ToggleLogin} >
          <SignUpText> Criar uma conta </SignUpText>
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
        onChangeText={(text) => setName(text)}
      />

      <Input
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="Crie uma senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Input
        placeholder="Digite seu cpf/cnpj"
        value={cpf_cnpj}
        onChangeText={(text) => setCpf_cnpj(text)}
      />

      <Input
        placeholder="Qual sua cidade?"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <Input
        placeholder="Digite seu CEP"
        value={zipcode}
        onChangeText={(text) => setZipcode(text)}
      />

      <Button onPress={ handleSignUp } >
        {loadingAuth
          ? (
            <ActivityIndicator size={20} color="#FFF" />
          )
          : (
            <ButtonText>Cadastrar</ButtonText>
          )}
      </Button>

      <SignUpButton onPress={ ToggleLogin } >
        <SignUpText>Ja possui uma conta?</SignUpText>
      </SignUpButton>

    </Container>
  );
}

export default Login;