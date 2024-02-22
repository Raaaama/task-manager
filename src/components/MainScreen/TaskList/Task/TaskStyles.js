import { StyleSheet } from "react-native";
import commonStyles from "../../../../styles/commonStyles";
import { GREY } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    height: 120,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoContainer: {
    flex: 1
  },
  actionContainer: {
    justifyContent: "space-around"
  },
  taskTitle: {
    fontFamily: commonStyles.Geometria700,
    fontSize: 20
  },
  taskDescription: {
    fontFamily: commonStyles.Geometria500,
    fontSize: 16,
    color: GREY
  },
  
})