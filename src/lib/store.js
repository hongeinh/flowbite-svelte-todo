// npm install @reduxjs/toolkit redux svelte-redux
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
}

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state,action) => {

        },

        toggleTodo: (state, action) => {

        },

        deleteTodo: (state, action) => {

        },
    }
})

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

// Configure the Redux store
export const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
    }
})