import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { Link } from "react-router-dom";

import "./navbar.css";
const auth = getAuth();

const Navbar = (params) => {
    const [user] = useAuthState(auth);
    return (
        <>
            <nav className='navbar'>
                <div className='navbarContent'>
                    <Link to='/'>
                        <img src='/favicon.ico' alt='logo' className='navbarLogo' />
                    </Link>
                  
                    <div className="nav-right">
                        <Link className='navbarOption' to='/'>
                            Dashboard
                        </Link>
                        <Link to='/about' className='navbarOption'>
                            About
                        </Link>
                        {user ? (
                            <Link to='/logout' className='navbarOption'>
                                Sign Out
                            </Link>
                        ) : (
                            <Link to='/login' className='navbarOption'>
                                Sign In
                            </Link>
                        )}
                        {user && (
                            <div className='navbarPhoto'>
                                <img className='navbarPhotoImage' alt = 'navbar' src={user.photoURL}></img>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
