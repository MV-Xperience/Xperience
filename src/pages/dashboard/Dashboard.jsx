import Navbar from "../../components/navbar/Navbar";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const auth = getAuth();

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();
    useEffect(() => {
        if (!loading && user == undefined) {
            // No user, redirect
            navigate("/login");
        }
    }, [loading]);
    return (
        <>
            <Navbar></Navbar>
        </>
    );
};

export default Dashboard;
