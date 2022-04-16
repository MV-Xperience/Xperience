import { Link } from "react-router-dom";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PanToolIcon from '@mui/icons-material/PanTool';
import FlagIcon from "@mui/icons-material/Flag";


import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc,updateDoc, arrayRemove, arrayUnion, writeBatch} from "firebase/firestore";
const IndQuestion = ({data, setQuestions, id}) => {
    const db = getFirestore();
    const auth = getAuth();

    const [liked, setLiked] = useState(data.likedBy.includes(auth.currentUser.uid));
    const [reported, setReported] = useState(data.reportedBy.includes(auth.currentUser.uid));

    const [likeCount, setLikeCount] = useState(data.likes);
    const [reportCount, setReportCount] = useState(data.reports);

    const handleLike = async(docId) => {
        const docRefReply = doc(db, "questions", docId);
        if(liked){ //reverse magic
            setLikeCount(likeCount - 1);
            const tempLikes = data.likes > 0 ? data.likedBy.length - 1 : 0
            await updateDoc(docRefReply, {likedBy: arrayRemove(auth.currentUser.uid), likes: tempLikes});
        }
        else{
            setLikeCount(likeCount + 1);
            await updateDoc(docRefReply, {likedBy: arrayUnion(auth.currentUser.uid), likes: data.likedBy.length + 1});
        }

        setLiked(!liked);

    }
    
    const handleReport = async(docId) => {
        const docRefReply = doc(db, "questions", docId);
        
        if(reported){ //reverse magic
            setReportCount(reportCount - 1);
            const tempReports = data.reports > 0 ? data.reportedBy.length - 1 : 0
            await updateDoc(docRefReply, {reportedBy: arrayRemove(auth.currentUser.uid), reports: tempReports});
        }
        else{
            setReportCount(reportCount + 1);
            await updateDoc(docRefReply, {reportedBy: arrayUnion(auth.currentUser.uid), reports: data.reportedBy.length + 1});
        }

        setReported(!reported);

    }

    const handleDelete = async(docId) => {
        const batch = writeBatch(db);
        const docRef = doc(db, "questions", docId);
        batch.delete(docRef);
        
        const docRefUser = doc(db, "users", auth.currentUser.uid);
        batch.update(docRefUser, {
            questionIds: arrayRemove(docId)
        })

        if(setQuestions !== undefined){
            setQuestions((questions) => questions.filter(question => question.id !== docId));
        }

        await batch.commit();

    }
    return (
        <div className='individual-question-div'>
            <div className="topPart">
                <div>
                    <h2>{data.text}</h2>
                </div>


               
                <div className="action-button-group">

                    <span style = {{color: liked ? "dodgerblue" : "" }} onClick = {()=>handleLike(id)}>
                        <p>{likeCount}</p>
                        <PanToolIcon />
                    </span>
                    <span style = {{color: reported ? "var(--reported)" : "" }} onClick = {()=>handleReport(id)}>
                        <p>{reportCount}</p>
                        <FlagIcon />
                    </span>

                    <span className = "deleteButton" onClick = {()=>handleDelete(id)}>
                        <DeleteForeverIcon />
                    </span>
                   
                </div>

            </div>
            {
                data.reports
                > 2 ? <p style = {{color: "red"}}>This question has been taken down due to a large number of reports. If you want to refute this decision please contact us!</p> : <br />
            }
            <Link to={"/question/" + id} className='question-link'>
                View Replies
            </Link>
           
        </div>
    );
};
export default IndQuestion;
