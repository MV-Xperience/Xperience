import Navbar from "../../components/navbar/Navbar";
import YourQuestions from "./YourQuestions";
import SuggestedActions from "./SuggestedActions";
import BannedPage from "./BannedPage";
import Loading from "../../components/loading/Loading";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import "./dashboard.css";

const auth = getAuth();

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const [banned, setBanned] = useState(false);

    useAuthRedirect();
    
    const DashboardContent = () => {
        return (
            <>
                <Navbar />
                <div className='entire-dashboard'>
                    <YourQuestions setBanned = {setBanned} user={user} loading={loading} />
                    <SuggestedActions user={user} loading={loading} />
                </div>
            </>
        )
    }
    return (
        <>
            {
                loading
                ? <Loading />
                : banned ? <BannedPage /> :  <DashboardContent />
            }
        </>
    );
};

export default Dashboard;
