
import { configureStore } from '@reduxjs/toolkit';
import uiSliceReducer from './uiSlice'
import profileSliceReducer from './profileSlice'

 const store =  configureStore({
  reducer: {
   UIState: uiSliceReducer,
   profile: profileSliceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;