import { View, TextInput, Modal, TouchableOpacity, Text } from "react-native";
import Input from "../Input/Input";
import { styles } from "./LogInModalStyles";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import axios from "axios";

const LogInModal = (props: any) => {
  const {
    visible,
    setLogInModalVisible,
    token,
    setToken,
    username,
    setUsername,
  } = props;

  const [titleText, setTitleText] = useState("log in");

  const [userExists, setUserExists] = useState(undefined);
  const [usernameEditable, setUsernameEditable] = useState(true);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const checkUser = () => {
    axios
      .post("http://192.168.1.69:3000/users/checkuser", {
        username: username,
      })
      .then((r) => {
        setUserExists(r.data.exists);
        setUsernameEditable(false);
        setTitleText(`welcome, ${username}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logIn = () => {
    axios
      .post("http://192.168.1.69:3000/users/login", {
        username: username,
        password: password1,
      })
      .then((r) => {
        setToken(r.data.token);
        setLogInModalVisible(false);
        getUserTasks(r.data.token);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const signUp = () => {
    axios
      .post("http://192.168.1.69:3000/users/signup", {
        username: username,
        password: password1,
      })
      .then((r) => {
        setToken(r.data.token);
        setLogInModalVisible(false);
        getUserTasks(r.data.token);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleButtonPress = () => {
    if (usernameEditable) {
      checkUser();
    } else {
      if (userExists) {
        logIn();
      } else {
        signUp();
      }
    }
  };

  const changeUsername = () => {
    setUsernameEditable(true);
    setTitleText("log in");
  };

  const getUserTasks = (token: string) => {
    console.log(token);

    const requestBody = {
      username: username,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post("http://192.168.1.69:3000/tasks/get-user-tasks", requestBody, {
        headers: headers,
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>{titleText}</Text>
          <Input
            inputMode={"text"}
            cursorColor={"#000"}
            secureTextEntry={false}
            onChangeText={setUsername}
            placeholder={"username"}
            value={username}
            editable={usernameEditable}
          />
          {usernameEditable ? null : userExists ? (
            <View>
              <Input
                inputMode={"text"}
                cursorColor={"#000"}
                secureTextEntry={true}
                onChangeText={setPassword1}
                placeholder={"password"}
                value={password1}
              />
              <Button text={"change username"} onPress={changeUsername} />
            </View>
          ) : (
            <View>
              <Input
                inputMode={"text"}
                cursorColor={"#000"}
                secureTextEntry={true}
                onChangeText={setPassword1}
                placeholder={"password"}
                value={password1}
              />
              <Input
                inputMode={"text"}
                cursorColor={"#000"}
                secureTextEntry={true}
                onChangeText={setPassword2}
                placeholder={"repeat password"}
                value={password2}
              />
              <Button text={"change username"} onPress={changeUsername} />
            </View>
          )}

          <Button text={"next"} onPress={handleButtonPress} />
        </View>
      </View>
    </Modal>
  );
};

export default LogInModal;
