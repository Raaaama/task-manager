import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: null,
  allTasksFilter: true,
  currentTask: {
    _id: "",
    title: "",
    description: "",
    completed: false,
    important: false
  },
  mode: "create"
}

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    resetToken: () => initialState,
    setAllTasksFilter: (state, action) => {
      state.allTasksFilter = action.payload
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload
    },
    setMode: (state, action) => {
      state.mode = action.payload
    }
  }
})

const {actions, reducer} = userSlice

export default reducer
export const {setToken, resetToken, setAllTasksFilter, setCurrentTask, setMode} = actions