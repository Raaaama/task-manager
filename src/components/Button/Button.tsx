import { TouchableOpacity, Text, Platform } from "react-native";
import { styles } from "./ButtonStyles";

const Button = (props: any) => {
  const { text, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
