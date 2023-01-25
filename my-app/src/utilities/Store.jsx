import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import serverAPIReducer from "./ServerRequests"
export const store = configureStore({
  reducer: {
    user: userReducer,
    serverAPI: serverAPIReducer,
  },
})