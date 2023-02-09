import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectIsLogged } from "../utilities/UserSlice"
export default function ProtectRoute({ children }) {
  const isLogged = useSelector(selectIsLogged)

  if (isLogged) {
    return children
  }

  return <Navigate to='/login' replace={true} />
}