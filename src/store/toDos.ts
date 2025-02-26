import { createSlice } from "@reduxjs/toolkit";
import { ToDo } from "../types";
import uuid from "react-native-uuid";
import { RootState } from "./index";

const initialState: ToDo[] = [];
const toDosSlice = createSlice({
  name: "toDos",
  initialState,
  reducers: {
    addToDo: (state, { payload }) => {
      const id = uuid.v4();
      state.push({
        id,
        text: payload,
        completed: false,
      });
    },
    deleteToDo: (state, action) => {
      state = state.filter((toDo) => toDo.id !== action.payload);
      return state;
    },
    toggleToDo: (state, action) => {
      const toDoIndex = state.findIndex((toDo) => toDo.id === action.payload);
      const toDo = state[toDoIndex];
      if (toDo) {
        toDo.completed = !toDo.completed;
        state.splice(toDoIndex, 1, toDo);
      }
    },
  },
});

export const selectToDos = (state: RootState) => state.toDos;
export const { addToDo, deleteToDo, toggleToDo } = toDosSlice.actions;
export const toDosReducer = toDosSlice.reducer;
