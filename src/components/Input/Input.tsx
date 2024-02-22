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
    multiline = false,
    height = 50,
    padding = 0,
  } = props;
  return (
    <TextInput
      style={[styles.input, { height: height, padding: padding }]}
      inputMode={inputMode}
      cursorColor={"#000"}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
      editable={editable}
      multiline={multiline}
    />
  );
};

export default Input;
