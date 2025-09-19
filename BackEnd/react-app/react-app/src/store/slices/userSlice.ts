import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserState {
  currentUser: User | null
  users: User[]
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    clearCurrentUser: (state) => {
      state.currentUser = null
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    updateUser: (state, action: PayloadAction<{ id: string; updates: Partial<User> }>) => {
      const { id, updates } = action.payload
      const userIndex = state.users.findIndex(user => user.id === id)
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates }
      }
      if (state.currentUser?.id === id) {
        state.currentUser = { ...state.currentUser, ...updates }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setCurrentUser,
  clearCurrentUser,
  addUser,
  removeUser,
  updateUser,
  setLoading,
  setError,
} = userSlice.actions

export default userSlice.reducer
