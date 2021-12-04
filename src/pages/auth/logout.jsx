import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { getAuth, signOut } from "firebase/auth";
import "./auth.css";
export default function Logout(params) {
    const [loggedOut, setLoggedOut] = useState(false);
    const nav = useNavigate();
    if (loggedOut) {
        nav("/#/");
    }
    useEffect(() => {
        window.setTimeout((e) => {
            const auth = getAuth();
            signOut(auth).then(() => setLoggedOut(true));
        }, 1000);
    }, []);
    return (
        //this needs to be eddited at some point
        <div className='logout-container'>
            <div>
                <h1>Logging you out</h1>
                <span>
                    <LinearProgress />
                </span>
            </div>
        </div>
    );
}
