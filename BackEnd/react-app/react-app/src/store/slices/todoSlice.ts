import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo{
  id:string
  text:string
  completed:boolean
  createAt:string
  priority: 'low' | 'medium'| 'high'
}

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  isLoading : boolean
  error : string | null
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  isLoading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers:{
    addTodo:(state,action:PayloadAction<{text:string ; priority: 'low' | 'medium'| 'high'}>)=>{
      const newTodo: Todo= {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        createAt: new Date().toISOString(),
        priority: action.payload.priority,
      }
      state.todos.push(newTodo)
    },
    toggleTodo:(state, action: PayloadAction<string>)=>{
      const todo = state.todos.find(todo => todo.id === action.payload)
      if(todo){
        todo.completed = !todo.completed
      }
    },
    deleteTodo:(state, action:PayloadAction<string>)=>{
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    updateTodo:(state, action:PayloadAction<{id:string; text:string}>)=>{
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if(todo){
        todo.text = action.payload.text
      } 
    },
    setFilter:(state, action:PayloadAction<'all' | 'active' | 'completed'>)=>{
      state.filter = action.payload
    },
    clearCompleted:(state)=>{
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    setLoading:(state, action:PayloadAction<boolean>)=>{
      state.isLoading = action.payload
    },
    setError:(state, action:PayloadAction<string | null>)=>{
      state.error = action.payload
    },
  },
})

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  setLoading,
  setError
} = todoSlice.actions

export default todoSlice.reducer