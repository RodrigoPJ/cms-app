import { createSlice, } from '@reduxjs/toolkit'
import type { UIState } from '../types/data-types'
import sliceReducers from './uiSlice-reducers'

// Define the initial state using that type
const initialState: UIState = {
  isDarkTheme: false,
  isLightTheme: false,
  isLoggedin: false,
}

const uiSlice = createSlice({
  name: 'UIState',
  initialState,
  reducers: sliceReducers,
})

export const { setDarkTheme, setLightTheme, setLogggedIn } = uiSlice.actions

export default uiSlice.reducer