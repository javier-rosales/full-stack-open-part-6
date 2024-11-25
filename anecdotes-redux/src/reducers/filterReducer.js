import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

export const { filterChange } = anecdoteSlice.actions
export default anecdoteSlice.reducer