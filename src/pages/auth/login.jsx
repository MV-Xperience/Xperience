import React from "react";
import FirebaseContainer from "./Auth";

const Login = () => {
    return (
        <div className='login-total-container'>
            <h1>
                To continue using <span>MVXperience</span>
            </h1>
            <FirebaseContainer />
        </div>
    );
};

export default Login;
