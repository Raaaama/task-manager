import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  Text,
  Platform,
} from "react-native";
import { styles } from "./MainScreenStyles";
import LogInModal from "../LogInModal/LogInModal";
import TaskList from "./TaskList/TaskList";

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toolbar from "./Toolbar/Toolbar";
import TaskModal from "../AddTaskModal/TaskModal";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetUserTasksQuery } from "../../redux/apiSlice";
import { ITask } from "../../Interfaces/ITask";

SplashScreen.preventAutoHideAsync();

const MainScreen = () => {
  const { token, allTasksFilter } = useAppSelector((state) => state.userSlice);

  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);

  const [getTasksQuery, { data: tasks, isFetching }] =
    useLazyGetUserTasksQuery();

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

  const handleRefresh = () => {
    getTasksQuery(token);
  };

  useEffect(() => {
    handleRefresh();
  }, [token]);

  useEffect(() => {
    if (tasks) {
      let a = tasks.reduce(function (sum: number, e: ITask) {
        if (allTasksFilter) {
          return !e.completed ? sum + 1 : sum;
        } else {
          return !e.completed && e.important ? sum + 1 : sum;
        }
      }, 0);
      setCount(a);
    }
  }, [tasks, allTasksFilter]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{ height: "100%" }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={handleRefresh}
              colors={["#000"]}
              tintColor={"#000"}
            />
          }
        >
          <StatusBar />
          <LogInModal username={username} setUsername={setUsername} />
          <TaskModal handleRefresh={handleRefresh} />
          <View style={styles.container}>
            <Text style={styles.greeting}>{`hello, ${username}`}</Text>
            <Text style={styles.stat}>{`${count} task(s) to do`}</Text>
            <Toolbar />
            <TaskList tasks={tasks} handleRefresh={handleRefresh} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MainScreen;
