import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useAuth } from "../../hooks/useAuth";

import { colors } from "../../styles/colors";

import homeImage from "../../assets/homeImage.png";

import {
  Container,
  Header,
  LogoutButton,
  LogoutButtonText,
  ProfileContent,
  ProfileContentImage,
  ProfileUserContent,
  UserWelcomeText,
  UserWelcomeSpanText,
  UserToken,
  RefreshToken,
  EditProfileButton,
  EditProfileButtonText,
} from "./styles";

export function Home() {
  const { user, signOut } = useAuth();

  const navigation = useNavigation();

  async function handleLoggout() {
    try {
      await signOut();

      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possivel deslogar do app",
      });
    }
  }

  async function refreshToken() {
    try {
      //to do
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possivel atualizar o token",
      });
    }
  }

  return (
    <Container>
      <Header>
        <LogoutButton onPress={handleLoggout}>
          <LogoutButtonText>Logout</LogoutButtonText>

          <Ionicons name="md-arrow-back" color={colors.blue500} size={25} />
        </LogoutButton>
      </Header>

      <ProfileContent>
        <ProfileContentImage source={homeImage} />

        <ProfileUserContent>
          <UserWelcomeText>
            Bem vindo,{" "}
            <UserWelcomeSpanText>
              {user?.nome.split(" ")[0]}
            </UserWelcomeSpanText>
          </UserWelcomeText>

          <UserToken>
            Seu token: token aqui
            {/* {user?.email} */}
          </UserToken>

          <RefreshToken onPress={refreshToken}>
            <FontAwesome name="refresh" size={24} color={colors.pink} />
          </RefreshToken>

          <EditProfileButton onPress={() => navigation.navigate("EditProfile")}>
            <EditProfileButtonText>Editar perfil</EditProfileButtonText>
          </EditProfileButton>
        </ProfileUserContent>
      </ProfileContent>
    </Container>
  );
}
