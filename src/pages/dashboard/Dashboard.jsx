import Navbar from "../../components/navbar/Navbar";
import YourQuestions from "./YourQuestions";
import SuggestedActions from "./SuggestedActions";
import Loading from "../../components/loading/Loading";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import "./dashboard.css";

const auth = getAuth();

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    
    useAuthRedirect();

    const DashboardContent = () => {
        return (
            <>
                <Navbar />
                <div className='entire-dashboard'>
                    <YourQuestions user={user} loading={loading} />
                    <SuggestedActions user={user} loading={loading} />
                </div>
            </>
        )
    }
    return (
        <>
            {loading ? <Loading /> : <DashboardContent />}
        </>
    );
};

export default Dashboard;
