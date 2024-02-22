import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./TaskStyles";
import { CheckMark, XMark, StarIcon } from "../../../icons/icons";
import { ITask } from "../../../../Interfaces/ITask";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setCurrentTask, setMode } from "../../../../redux/userSlice";
import { setTaskModalVisible } from "../../../../redux/visibilitySlice";
import { useLazyEditTaskQuery } from "../../../../redux/apiSlice";

interface TaskProps {
  task: ITask;
  handleRefresh: () => void;
}

const Task: React.FC<TaskProps> = (props) => {
  const { task, handleRefresh } = props;

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.userSlice);

  const [editTaskQuery, {}] = useLazyEditTaskQuery();

  const handlePress = () => {
    dispatch(setCurrentTask(task));
    dispatch(setMode("edit"));
    dispatch(setTaskModalVisible(true));
  };

  const setImportant = () => {
    editTaskQuery([
      { ...task, important: !task.important, taskId: task._id },
      token,
    ])
      .then((e) => {
        handleRefresh();
      })
      .catch((error) => {
        console.log("Error editing task:", error);
      });
  };

  const setCompleted = () => {
    editTaskQuery([
      { ...task, completed: !task.completed, taskId: task._id },
      token,
    ])
      .then((e) => {
        handleRefresh();
      })
      .catch((error) => {
        console.log("Error editing task:", error);
      });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.infoContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={setImportant}>
          <StarIcon filled={task.important} />
        </TouchableOpacity>
        <TouchableOpacity onPress={setCompleted}>
          {task.completed ? <XMark /> : <CheckMark />}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Task;
