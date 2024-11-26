import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeInSeconds) => {
  return dispatch => {
    dispatch(createNotification(message))

    setTimeout(() => dispatch(removeNotification()), timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer