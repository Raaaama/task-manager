import { StyleSheet } from "react-native";
import commonStyles from "../../commonStyles";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000AFF",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginVertical: 10
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