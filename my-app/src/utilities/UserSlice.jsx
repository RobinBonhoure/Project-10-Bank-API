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
  profile: {
    email: "",
    firstName: "",
    id: "",
    lastName: ""
  },
  profileLoaded: false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
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
    logout: (state) => {
      if (!state.rememberMe) state.email = ""
      state.token = ""
      state.isLogged = false
      state.profile = {
        email: "",
        firstName: "",
        id: "",
        lastName: ""
      }
      state.profileLoaded = false
      localStorage.removeItem("token")
    },
    profile: (state, action) => {
      if (action.payload) {
        state.profileLoaded = true
        state.profile = action.payload
      } else state.profileLoaded = false
    },
    saveProfile: (state, action) => {
      state.profile.firstName = action.payload.firstName
      state.profile.lastName = action.payload.lastName
    },
    saveRememberMe: (state, action) => {
      state.rememberMe = action.payload.rememberMe
      if (state.rememberMe)
        localStorage.setItem("username", action.payload.credentials.email)
      else localStorage.removeItem("username")
    },
  },
})

// Actions
export const { login, logout, profile, saveProfile, apierror, saveRememberMe } = userSlice.actions

// Selectors
export const selectIsLogged = (state) => state.user.isLogged
export const selectProfileLoaded = (state) => state.user.profileLoaded
export const selectProfile = (state) => state.user.profile
export const selectToken = (state) => state.user.token
export const selectHello = (state) => state.user.hello
export const selectUserName = (state) => state.user.email
export const selectRememberMe = (state) => state.user.rememberMe
export const selectLogFailed = (state) => state.user.logFailed
export default userSlice.reducer