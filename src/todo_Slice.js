
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [
            { id: 1, text: 'Sample Task 1', completed: false },
            { id: 2, text: 'Sample Task 2', completed: true },     
        ],
        filter: 'All', 
    },
    reducers: {
        addTodo: (state, action) => {
            state.list.push({ id: Date.now(), text: action.payload, completed: false });
        },
        editTodo: (state, action) => {
            const todo = state.list.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
            }
        },
        deleteTodo: (state, action) => {
            state.list = state.list.filter((todo) => todo.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            const todo = state.list.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addTodo, editTodo, deleteTodo, toggleComplete, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
