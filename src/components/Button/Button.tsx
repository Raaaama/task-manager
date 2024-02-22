import { TouchableOpacity, Text, Platform } from "react-native";
import { styles } from "./ButtonStyles";

const Button = (props: any) => {
  const {
    text,
    onPress,
    width = "100%",
    height = 50,
    marginVertical = 10,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { width: width, height: height, marginVertical: marginVertical },
        styles.button,
        Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
