import Navbar from "../../components/navbar/Navbar";
import YourQuestions from "./YourQuestions";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./dashboard.css";

const auth = getAuth();

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    let navigate = useNavigate();
    useEffect(() => {
        if (!loading && user === undefined) {
            // No user, redirect
            navigate("/login");
        }
    }, [loading, navigate, user]);
    return (
        <>
            <Navbar></Navbar>
            <div>
                <YourQuestions user={user} loading={loading} />
                <div></div>
            </div>
        </>
    );
};

export default Dashboard;
