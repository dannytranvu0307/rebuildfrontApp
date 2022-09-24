import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './login';
import userSlice from './userData';
import videoSlice from './video';
export default configureStore({
  reducer: {
    login:loginSlice.reducer,
    UserData:userSlice.reducer,
    video:videoSlice.reducer
  }
})