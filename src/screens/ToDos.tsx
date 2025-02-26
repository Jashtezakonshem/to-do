import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { FunctionComponent, useCallback, useState } from "react";
import { Colors } from "../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo, selectToDos, toggleToDo } from "../store/toDos";
import { ToDo } from "../types";
import ToDoItem from "../components/ToDoItem";

const ToDos: FunctionComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectToDos, shallowEqual);
  const [newToDo, setNewToDo] = useState("");
  const onFabPress = () => {
    if (!newToDo) {
      return;
    }
    dispatch(addToDo(newToDo));
    setNewToDo("");
  };

  const onToDoToggle = useCallback(
    (id: string) => {
      dispatch(toggleToDo(id));
    },
    [dispatch],
  );

  const onToDoDelete = useCallback(
    (id: string) => {
      console.log(id);
      dispatch(deleteToDo(id));
    },
    [dispatch],
  );

  const renderToDo = useCallback(
    ({ item }: { item: ToDo }) => {
      return (
        <ToDoItem toDo={item} onToggle={onToDoToggle} onDelete={onToDoDelete} />
      );
    },
    [onToDoDelete, onToDoToggle],
  );

  return (
    <View style={styles.container}>
      <View style={styles.newToDoContainer}>
        <TextInput
          value={newToDo}
          onChangeText={setNewToDo}
          style={styles.newToDoTextInput}
          placeholder="New To Do"
        />
        <Pressable onPress={onFabPress} style={styles.newToDoButton}>
          <AntDesign name="pluscircle" size={32} color={Colors.secondary} />
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderToDo}
        keyExtractor={(toDO: ToDo) => toDO.id}
        contentContainerStyle={styles.toDosContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  newToDoContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    margin: 16,
    elevation: 4,
  },
  newToDoTextInput: {
    padding: 8,
    flex: 1,
    backgroundColor: Colors.light,
    borderRadius: 8,
  },
  newToDoButton: {
    marginLeft: 16,
  },
  toDosContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    backgroundColor: Colors.light,
  },
});

export default ToDos;
