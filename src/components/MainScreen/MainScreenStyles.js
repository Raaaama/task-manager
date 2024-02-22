import { StyleSheet } from "react-native";
import commonStyles from "../../styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  greeting: {
    fontSize: 30,
    fontFamily: commonStyles.Geometria700,
    marginTop: 30
  },
  stat: {
    fontSize: 20,
    fontFamily: commonStyles.Geometria500,
  }
})