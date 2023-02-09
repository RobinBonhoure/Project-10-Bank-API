import logo from '../img/argentBankLogo.png'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    selectProfileLoaded,
    selectToken,
    selectIsLogged,
    logout,
    selectProfile
} from "../utilities/UserSlice"
import { APIProfile } from "../utilities/ServerRequests"
import { useEffect } from "react"

export default function Header() {
    const profileLoaded = useSelector(selectProfileLoaded)
    const reduxProfil = useSelector(selectProfile)
    const token = useSelector(selectToken)
    const isLogged = useSelector(selectIsLogged)
    const dispatch = useDispatch()

    function logoutHandler(e) {
        e.preventDefault()
        dispatch(logout())
    }
    useEffect(() => {
        if (!isLogged || profileLoaded) return
        dispatch(APIProfile())
    }, [isLogged, profileLoaded, token, dispatch])

    return (
        <nav className="main-nav">
            <Link className='main-nav-logo' to='/'>
                <img
                    className='main-nav-logo-image'
                    src={logo}
                    alt='Argent Bank Logo'
                />
                <h1 className='sr-only'>Argent Bank</h1>
            </Link>
            {profileLoaded ? (
                <div>
                    <Link className='main-nav-item' to='/user'>
                        <i className='fa fa-user-circle'></i>
                        {reduxProfil.firstName}
                    </Link>
                    <Link className='main-nav-item' to='./' onClick={logoutHandler}>
                        <i className='fa fa-sign-out'></i>
                        Sign Out
                    </Link>
                </div>
            ) : (
                <div>
                    <Link className='main-nav-item' to='/login'>
                        <i className='fa fa-user-circle'></i>
                        <span>Sign In</span>
                    </Link>
                </div>
            )}
        </nav>
    )
}