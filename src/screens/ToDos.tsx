import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { Colors } from "../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo, selectToDos, toggleToDo } from "../store/toDos";
import { ToDo } from "../types";
import ToDoItem from "../components/ToDoItem";

type Filter = "all" | "toDo" | "completed";

const ToDos: FunctionComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectToDos, shallowEqual);

  const [newToDo, setNewToDo] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  const filteredToDos = useMemo(() => {
    switch (filter) {
      case "toDo":
        return todos.filter((toDo) => !toDo.completed);
      case "completed":
        return todos.filter((toDo) => toDo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

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
      <View style={styles.filterContainer}>
        <Pressable onPress={() => setFilter("all")} style={styles.filter}>
          <Text
            style={filter === "all" ? styles.selectedFilterText : undefined}
          >
            All
          </Text>
        </Pressable>
        <Pressable onPress={() => setFilter("toDo")} style={styles.filter}>
          <Text
            style={filter === "toDo" ? styles.selectedFilterText : undefined}
          >
            To do
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("completed")}
          style={[styles.filter, styles.lastFilter]}
        >
          <Text
            style={
              filter === "completed" ? styles.selectedFilterText : undefined
            }
          >
            Completed
          </Text>
        </Pressable>
      </View>
      <View style={styles.toDosContainer}>
        <FlatList
          data={filteredToDos}
          renderItem={renderToDo}
          keyExtractor={(toDO: ToDo) => toDO.id}
        />
      </View>
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  filter: {
    flex: 1,
    borderRightWidth: 1,
    alignItems: "center",
  },
  lastFilter: {
    borderRightWidth: 0,
  },
  selectedFilterText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  toDosContainer: {
    flex: 1,
    flexGrow: 1,
    margin: 16,
    borderRadius: 8,
    backgroundColor: Colors.light,
  },
});

export default ToDos;
