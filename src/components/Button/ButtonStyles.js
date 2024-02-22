import { StyleSheet } from "react-native";
import commonStyles from "../../styles/commonStyles";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  buttonText: {
    fontFamily: commonStyles.Geometria700,
    color: "#fff",
    fontSize: 20
  },
  androidShadow: {
    elevation: 5,
  },
  iosShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
})