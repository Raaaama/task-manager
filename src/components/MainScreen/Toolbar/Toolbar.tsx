import { TouchableOpacity, View, Text, Switch } from "react-native";
import { styles } from "./ToolbarStyles";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTaskModalVisible } from "../../../redux/visibilitySlice";
import { setAllTasksFilter, setMode } from "../../../redux/userSlice";
import Button from "../../Button/Button";

const Toolbar = () => {
  const dispatch = useAppDispatch();

  const { allTasksFilter } = useAppSelector((state) => state.userSlice);

  const filterTasks = (e: boolean) => {
    dispatch(setAllTasksFilter(e));
  };

  const createTask = () => {
    dispatch(setMode("create"));
    dispatch(setTaskModalVisible(true));
  };

  return (
    <View style={styles.container}>
      <Button
        text={"+"}
        width={75}
        height={40}
        marginVertical={0}
        onPress={createTask}
      />
      <View style={styles.filerContainer}>
        <TouchableOpacity onPress={() => filterTasks(true)}>
          <Text
            style={[
              styles.filterText,
              allTasksFilter ? styles.selectedFilterText : null,
            ]}
          >
            all tasks
          </Text>
        </TouchableOpacity>
        <View style={styles.switchView}>
          <Switch
            trackColor={{ false: "#fff", true: "#fff" }}
            thumbColor={allTasksFilter ? "#000" : "#000"}
            ios_backgroundColor="#fff"
            onValueChange={() => filterTasks(!allTasksFilter)}
            value={!allTasksFilter}
            disabled
          />
        </View>
        <TouchableOpacity onPress={() => filterTasks(false)}>
          <Text
            style={[
              styles.filterText,
              allTasksFilter ? null : styles.selectedFilterText,
            ]}
          >
            important
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Toolbar;
