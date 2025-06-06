import { createSlice, } from '@reduxjs/toolkit'
import type { User, } from '../types/data-types'
import profileReducers from './profileReducers'

// Define the initial state using that type
const initialState: User = {
 userAccount: { id: '',
  user: '',
  userName: '',
  dateCreated: '',
	userType: ''},
  projects: []
}

const profile = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: profileReducers,
})

export const { setProfile, addProject, addContent, addAllContents } = profile.actions

export default profile.reducer