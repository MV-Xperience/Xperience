import React from "react";
import FirebaseContainer from "./Auth";

const Login = () => {
    return (
        <div className='login-total-container'>
            <div>
                <h2>
                    To continue using <span>MVXperience</span>, you need to:
                </h2>
                <FirebaseContainer />
            </div>
        </div>
    );
};

export default Login;
