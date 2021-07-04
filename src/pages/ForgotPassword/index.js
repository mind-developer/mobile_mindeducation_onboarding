import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Title, ParagraphText, ParagraphLinkText } from "./styles";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  return (
    <Container>
      <Title>Esqueci minha senha</Title>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        selectTextOnFocus
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCompleteType="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Button>Enviar código</Button>

      <ParagraphText>
        Já possui uma conta?{" "}
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <ParagraphLinkText>Entrar</ParagraphLinkText>
        </TouchableWithoutFeedback>
      </ParagraphText>
    </Container>
  );
}
