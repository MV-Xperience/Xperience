import React from "react";
import FirebaseContainer from "./Auth";

const Login = () => {
    return (
        <div className='login-total-container'>
            <h2>
                Sign in to continue using <span>MVXperience</span>
            </h2>
            <FirebaseContainer />
        </div>
    );
};

export default Login;
