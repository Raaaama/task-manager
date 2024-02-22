import {
  View,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTaskModalVisible } from "../../redux/visibilitySlice";
import Button from "../Button/Button";
import Input from "../Input/Input";
import PageTitle from "../PageTitle/PageTitle";
import { styles } from "./TaskModalStyles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLazyEditTaskQuery } from "../../redux/apiSlice";

interface TaskModalProps {
  handleRefresh: () => void;
}

const TaskModal: React.FC<TaskModalProps> = (props) => {
  const { handleRefresh } = props;

  const { taskModalVisible } = useAppSelector((state) => state.visibilitySlice);
  const { mode, currentTask } = useAppSelector((state) => state.userSlice);
  const { token } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();

  const [editTaskQuery, {}] = useLazyEditTaskQuery();

  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
    important: false,
  });

  const updateTaskTitle = (newTitle: string) => {
    setTask((prevTask) => ({
      ...prevTask,
      title: newTitle,
    }));
  };

  const updateTaskDescription = (newDescription: string) => {
    setTask((prevTask) => ({
      ...prevTask,
      description: newDescription,
    }));
  };

  const saveTask = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (mode === "create") {
      axios
        .post("http://192.168.1.69:3000/tasks/add-task", task, {
          headers: headers,
        })
        .then(() => {
          updateTaskTitle("");
          updateTaskDescription("");
          handleRefresh();
          dispatch(setTaskModalVisible(false));
        })
        .catch((error) => {
          console.log("Error fetching tasks:", error);
        });
    } else {
      editTaskQuery([{ ...task, taskId: currentTask._id }, token])
        .then(() => {
          updateTaskTitle("");
          updateTaskDescription("");
          handleRefresh();
          dispatch(setTaskModalVisible(false));
        })
        .catch((error) => {
          console.log("Error fetching tasks:", error);
        });
    }
  };

  const deleteTask = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .delete("http://192.168.1.69:3000/tasks/" + currentTask._id, {
        headers: headers,
      })
      .then(() => {
        updateTaskTitle("");
        updateTaskDescription("");
        handleRefresh();
        dispatch(setTaskModalVisible(false));
      })
      .catch((error) => {
        console.log("Error deleting task:", error);
      });
  };

  useEffect(() => {
    if (mode === "create") {
      setTask({
        title: "",
        description: "",
        completed: false,
        important: false,
      });
    } else {
      setTask({
        title: currentTask.title,
        description: currentTask.description,
        completed: currentTask.completed,
        important: currentTask.important,
      });
    }
  }, [mode, currentTask]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Modal
        visible={taskModalVisible}
        animationType="slide"
        onRequestClose={() => dispatch(setTaskModalVisible(false))}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.container}
        >
          <View style={styles.formContainer}>
            <PageTitle text={mode + " task"} />
            <Input
              placeholder={"task title"}
              value={task.title}
              onChangeText={updateTaskTitle}
            />
            <Input
              placeholder={"task description"}
              multiline={true}
              height={300}
              padding={30}
              value={task.description}
              onChangeText={updateTaskDescription}
            />
            <Button text={"save"} onPress={saveTask} />
            {mode === "edit" ? (
              <Button text={"delete task"} onPress={deleteTask} />
            ) : null}
          </View>
        </ScrollView>
      </Modal>
    </KeyboardAvoidingView>
  );
};
export default TaskModal;
