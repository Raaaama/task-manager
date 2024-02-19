import { StyleSheet } from "react-native";
import commonStyles from "../../commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    marginTop: "50%",
    width: "80%"
  },
  title: { 
    fontFamily: commonStyles.Geometria700,
    fontSize: 30,
    marginVertical: 10,
    alignSelf: "center"
  }
})