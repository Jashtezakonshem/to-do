import { ToDo } from "../types";
import { Pressable, StyleSheet, View } from "react-native";
import { FunctionComponent, memo } from "react";
import { Colors } from "../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import CheckBox from "./CheckBox";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type ToDoProps = {
  toDo: ToDo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};
const ToDoItem: FunctionComponent<ToDoProps> = ({
  toDo,
  onDelete,
  onToggle,
}) => {
  const { id, text, completed } = toDo;

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(completed ? 0.7 : 1, { duration: 150 }),
      textDecorationLine: completed ? "line-through" : "none",
    };
  });

  return (
    <View style={styles.container}>
      <CheckBox
        style={styles.checkbox}
        checked={completed}
        onValueChange={() => onToggle(id)}
      />
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        {text}
      </Animated.Text>
      <Pressable onPress={() => onDelete(id)}>
        <AntDesign name={"delete"} size={16} color={Colors.danger} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    color: Colors.dark,
  },
  completed: {
    textDecorationLine: "line-through",
  },
});

export default memo(ToDoItem);
