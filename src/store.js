import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo_Slice';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});
