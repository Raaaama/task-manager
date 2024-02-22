import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logInModalVisible: true,
  taskModalVisible: false,
}

export const visibilitySlice = createSlice({
  name: "visibilitySlice",
  initialState,
  reducers: {
    setLogInModalVisible: (state, action) => {
      state.logInModalVisible = action.payload
    },
    setTaskModalVisible: (state, action) => {
      state.taskModalVisible = action.payload
    }
  }
})

const {actions, reducer} = visibilitySlice

export default reducer
export const {setLogInModalVisible, setTaskModalVisible} = actions