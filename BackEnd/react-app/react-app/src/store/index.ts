import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import todoReducer from './slices/todoSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    todos: todoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
