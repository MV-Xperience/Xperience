import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "@firebase/auth";


const useAuthRedirect = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    let navigate = useNavigate();
    useEffect(() => {
        if (!loading && user === null) {
            // No user, redirect
            navigate("/login");
        }
    }, [loading, navigate, user]);

}

export default useAuthRedirect;