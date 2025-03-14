import { createSlice } from "@reduxjs/toolkit"
import { login, profile, apierror } from "./UserSlice"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001/api/v1/user"
const initialState = {
  status: "void",
  data: null,
  error: null,
}

const request = async (dispatch, getState, url, method, payload) => {
  const localState = getState()
  const status = localState.serverAPI.status
  const token = localState.user.token

  if (status && status === "pending") {
    return
  }
  if (token && token !== "")
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  if (payload)
    axios.defaults.headers.common["Content-Type"] = `application/json`

  dispatch(actions.fetching())
  try {
    const response = await method(url, payload)
    const data = await response.data
    dispatch(actions.resolved(data.body))
  } catch (error) {
    console.log(error.message)
    dispatch(actions.rejected(error.message))
    dispatch(apierror())
  }
}
const postRequest = async (dispatch, getState, dispatchAction) => {
  const localState = getState()
  if (localState.serverAPI.status === "resolved" && dispatchAction) {
    dispatch(dispatchAction(localState.serverAPI.data))
  }
  dispatch(actions.initrequest())
}

export function APILogin(credentials) {
  return async (dispatch, getState) => {
    await request(dispatch, getState, "/login", axios.post, credentials)
    postRequest(dispatch, getState, login)
  }
}

export function APIProfile() {
  return async (dispatch, getState) => {
    await request(dispatch, getState, "/profile", axios.post, null)
    postRequest(dispatch, getState, profile)
  }
}

export function APIUpdateProfile(payload) {
  return async (dispatch, getState) => {
    await request(dispatch, getState, "/profile", axios.put, payload)
    postRequest(dispatch, getState, null)
  }
}

const { actions, reducer } = createSlice({
  name: "serverAPI",
  initialState,
  reducers: {
    initrequest: {
      reducer: (draft) => {
        draft.status = "void"
        draft.data = null
        return
      },
    },
    fetching: {
      reducer: (draft) => {
        if (draft.status === "void") {
          draft.status = "pending"
          return
        }
        if (draft.status === "rejected") {
          draft.error = null
          draft.status = "pending"
          return
        }
        if (draft.status === "resolved") {
          return
        }
      },
    },
    resolved: {
      reducer: (draft, action) => {
        if (draft.status === "pending") {
          draft.data = action.payload
          draft.status = "resolved"
          return
        }
        return
      },
    },
    rejected: {
      reducer: (draft, action) => {
        if (draft.status === "pending") {
          draft.error = action.payload
          draft.data = action.payload
          draft.status = "rejected"
          return
        }
        return
      },
    },
  },
})

// Actions
export const { fetching, rejected, resolved } = actions

// Selectors
export const selectStatus = (state) => state.serverAPI.status

export default reducer