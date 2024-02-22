import { Text } from "react-native";
import { styles } from "./TaskListStyles";
import { useAppSelector } from "../../../redux/hooks";
import Task from "./Task/Task";
import { ITask } from "../../../Interfaces/ITask";

interface TaskListProps {
  tasks: ITask[];
  handleRefresh: () => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const { tasks, handleRefresh } = props;

  const { allTasksFilter } = useAppSelector((state) => state.userSlice);

  return (
    <>
      <Text style={styles.categoryTitle}>to do:</Text>
      {tasks?.map((e: ITask) => {
        return (!e.completed && e.important === !allTasksFilter) ||
          (!e.completed && allTasksFilter) ? (
          <Task task={e} key={e._id} handleRefresh={handleRefresh} />
        ) : null;
      })}
      <Text style={styles.categoryTitle}>done:</Text>
      {tasks?.map((e: ITask) => {
        return (e.completed && e.important === !allTasksFilter) ||
          (e.completed && allTasksFilter) ? (
          <Task task={e} key={e._id} handleRefresh={handleRefresh} />
        ) : null;
      })}
    </>
  );
};

export default TaskList;
