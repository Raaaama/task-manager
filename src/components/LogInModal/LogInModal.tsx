import { View, Modal } from "react-native";
import Input from "../Input/Input";
import { styles } from "./LogInModalStyles";
import { useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLogInModalVisible } from "../../redux/visibilitySlice";
import { setToken } from "../../redux/userSlice";
import PageTitle from "../PageTitle/PageTitle";

interface LogInModalProps {
  username: string;
  setUsername: (value: string) => void;
}

const LogInModal: React.FC<LogInModalProps> = (props) => {
  const { username, setUsername } = props;

  const { logInModalVisible } = useAppSelector(
    (state) => state.visibilitySlice
  );

  const dispatch = useAppDispatch();

  const [titleText, setTitleText] = useState("log in");
  const [buttonText, setButtonText] = useState("continue");

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
        if (r.data.exists) setButtonText("log in");
        else setButtonText("sign up");
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
        dispatch(setToken(r.data.token));
        dispatch(setLogInModalVisible(false));
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
    setButtonText("continue");
  };

  return (
    <Modal visible={logInModalVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.form}>
          <PageTitle text={titleText} />
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

          <Button text={buttonText} onPress={handleButtonPress} />
        </View>
      </View>
    </Modal>
  );
};

export default LogInModal;
