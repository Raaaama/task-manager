import { StyleSheet } from "react-native";
import commonStyles from "../../../styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  filerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  filterText: {
    fontSize: 18,
    fontFamily: commonStyles.Geometria500,
    color: "#7E7E7E",
  },
  selectedFilterText: {
    color: "#000",
    textDecorationLine: "underline",
    fontFamily: commonStyles.Geometria700,
  },
  switchView: {
    borderColor: "#000",
    borderWidth: 2,
    height: 22,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    borderRadius: 10
  }
})