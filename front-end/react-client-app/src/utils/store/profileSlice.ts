import { createSlice, } from '@reduxjs/toolkit'
import type { Profile } from '../types/data-types'
import profileReducers from './profileReducers'

// Define the initial state using that type
const initialState: Profile = {
  id: '',
  user: '',
  userName: '',
  dateCreated: new Date(),
	userType: ''
}

const profile = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: profileReducers,
})

export const { setProfile } = profile.actions

export default profile.reducer