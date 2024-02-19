import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  Text,
  Platform,
} from "react-native";
import { styles } from "./MainScreenStyles";
import LogInModal from "../LogInModal/LogInModal";

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const MainScreen = () => {
  const [logInModalVisible, setLogInModalVisible] = useState(true);
  const [token, setToken] = useState();
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);

  const [fontsLoaded, fontError] = useFonts({
    "Geometria-Medium": require("../../../assets/fonts/geometria_medium.otf"),
    "Geometria-Bold": require("../../../assets/fonts/geometria_bold.otf"),
    "Geometria-Light": require("../../../assets/fonts/geometria_light.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const loginModalProps = {
    logInModalVisible,
    setLogInModalVisible,
    token,
    setToken,
    username,
    setUsername,
  };

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl
              refreshing={false}
              // onRefresh={onRefresh}
              // colors={[YELLOW]}
              // tintColor={YELLOW}
            />
          }
        >
          <StatusBar />
          <LogInModal
            visible={logInModalVisible}
            setLogInModalVisible={setLogInModalVisible}
            token={token}
            setToken={setToken}
            username={username}
            setUsername={setUsername}
          />
          <View style={styles.container}>
            <Text style={styles.greeting}>{`hello, ${username}`}</Text>
            <View>
              {/* <View style={[styles.dot, {color: }]}>

              </View> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MainScreen;
