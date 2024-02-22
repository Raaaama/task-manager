import { Text } from "react-native";
import { styles } from "./PageTitleStyles";

const PageTitle = (props: any) => {
  const { text } = props;

  return <Text style={styles.title}>{text}</Text>;
};

export default PageTitle;
