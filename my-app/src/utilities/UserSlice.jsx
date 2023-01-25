import { createSlice } from "@reduxjs/toolkit"

function initToken() {
  const token = localStorage.getItem("token")
  return token
}

function initUserName() {
  const userName = localStorage.getItem("username")
  return userName ? userName : ""
}

function isUserName() {
  const isUserName = localStorage.getItem("username") ? true : false
  return isUserName
}

const initialState = {
  email: initUserName(),
  rememberMe: isUserName(),
  token: initToken(),
  isLogged: false,
  logFailed: false,
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.isLogged = true
      state.logFailed = false
      localStorage.setItem("token", action.payload.token)
      state.token = action.payload.token
    },
    apierror: (state) => {
      state.logFailed = true
    },
    saveRememberMe: (state, action) => {
      state.rememberMe = action.payload.rememberMe
      if (state.rememberMe)
        localStorage.setItem("username", action.payload.credentials.email)
      else localStorage.removeItem("username")
    },
  },
})

export const {
  login,
  apierror,
  saveRememberMe,
} = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsLogged = (state) => state.user.isLogged
export const selectToken = (state) => state.user.token
export const selectHello = (state) => state.user.hello
export const selectUserName = (state) => state.user.email
export const selectRememberMe = (state) => state.user.rememberMe
export const selectLogFailed = (state) => state.user.logFailed
export default userSlice.reducer