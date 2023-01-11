import logo from '../img/argentBankLogo.png';
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <div>
            <nav className="main-nav">
                <Link className='main-nav-logo' to='/'>
                    <img
                        className='main-nav-logo-image'
                        src={logo}
                        alt='Argent Bank Logo'
                    />
                    <h1 className='sr-only'>Argent Bank</h1>
                </Link>
                <div>
                    <Link className='main-nav-item' to='/login'>
                        <i className='fa fa-user-circle'></i>
                        <span>Sign In</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}