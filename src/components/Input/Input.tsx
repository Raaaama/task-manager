import { TextInput } from "react-native";
import { styles } from "./InputStyles";

const Input = (props: any) => {
  const {
    inputMode,
    secureTextEntry,
    onChangeText,
    placeholder,
    value,
    editable,
  } = props;
  return (
    <TextInput
      style={styles.input}
      inputMode={inputMode}
      cursorColor={"#000"}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
      editable={editable}
    />
  );
};

export default Input;
