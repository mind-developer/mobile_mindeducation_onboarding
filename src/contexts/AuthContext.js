import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import { api } from "../services/api";

export const AuthContext = createContext({
  user: {},
  loading: false,
  signIn({ email, senha }) {},
  signOut() {},
  updateUserData(id) {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const [storagedUser, storagedToken] = await AsyncStorage.multiGet([
        "@MindMCEv2:user",
        "@MindMCEv2:token",
      ]);

      if (storagedToken[1] && storagedUser[1]) {
        api.defaults.headers.authorization = `Bearer ${storagedToken[1]}`;
        setUser(JSON.parse(storagedUser[1]));
      }

      setLoading(false);
    }
    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post("/auth", { login: email, senha });

    api.defaults.headers.authorization = `Bearer ${response.data.token}`;

    setUser(response.data.user);

    try {
      await AsyncStorage.setItem(
        "@MindMCEv2:user",
        JSON.stringify(response.data.user)
      );
      await AsyncStorage.setItem(
        "@MindMCEv2:token",
        JSON.stringify(response.data.token)
      );
    } catch {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Erro",
        text2:
          "Não foi possível salvar alguma informação, tente relogar no app.",
      });
    }

    return response.data.user;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("@MindMCEv2:user");
      await AsyncStorage.removeItem("@MindMCEv2:token");

      setUser();
    } catch {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Erro",
        text2: "Não foi possível remover alguma informação.",
      });
    }
  }, []);

  const updateUserData = useCallback(async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
      await AsyncStorage.setItem(
        "@MindMCEv2:user",
        JSON.stringify(response.data)
      );
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Erro",
        text2: "Não foi atualizar alguma informação, tente relogar no app.",
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
