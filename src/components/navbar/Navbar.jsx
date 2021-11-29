import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { Link } from "react-router-dom";
import "./navbar.css";
const auth = getAuth();
const Navbar = (params) => {
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {}, []);
    return (
        <>
            <nav className='navbar'>
                <div className='navbarContent'>
                    <Link to='/home'>
                        <img src='/images/transparent.png' alt='logo' className='navbarLogo' />
                    </Link>
                    <div className='searchBar'>
                        <input className='searchInput' placeholder={"Search for questions, answers, classes ..."}></input>
                    </div>
                    <Link className='navbarOption' to='/home'>
                        Home
                    </Link>
                    <Link to='/help' className='navbarOption'>
                        Help
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
                            <img className='navbarPhotoImage' src={user.photoURL}></img>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
