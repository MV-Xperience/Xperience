import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc,updateDoc, arrayRemove, arrayUnion, writeBatch} from "firebase/firestore";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Reply = ({reply, id}) => {
    const auth = getAuth();
    const db = getFirestore();
    const [liked, setLiked] = useState(reply.data().likedBy.includes(auth.currentUser.uid));
    const [reported, setReported] = useState(reply.data().reportedBy.includes(auth.currentUser.uid));

    const [likeCount, setLikeCount] = useState(reply.data().likes);
    const [reportCount, setReportCount] = useState(reply.data().reports);

    const handleLike = async(docId) => {
        const docRefReply = doc(db, "questions", id, "replies", docId);

        if(liked){ //reverse magic
            setLikeCount(likeCount - 1);
            const tempLikes = reply.data().likes > 0 ? reply.data().likedBy.length - 1 : 0
            await updateDoc(docRefReply, {likedBy: arrayRemove(auth.currentUser.uid), likes: tempLikes});
        }
        else{
            setLikeCount(likeCount + 1);
            await updateDoc(docRefReply, {likedBy: arrayUnion(auth.currentUser.uid), likes: reply.data().likedBy.length + 1});
        }

        setLiked(!liked);


    }
    const handleReport = async(docId) => {
        const docRefReply = doc(db, "questions", id, "replies", docId);
        

        if(reported){ //reverse magic
            setReportCount(reportCount - 1);
            const tempReports = reply.data().reports > 0 ? reply.data().reportedBy.length - 1 : 0
            await updateDoc(docRefReply, {reportedBy: arrayRemove(auth.currentUser.uid), reports: tempReports});
        }
        else{
            setReportCount(reportCount + 1);
            await updateDoc(docRefReply, {reportedBy: arrayUnion(auth.currentUser.uid), reports: reply.data().reportedBy.length + 1});
        }

        setReported(!reported);

    }

    const handleDelete = async(docId) => {
        const batch = writeBatch(db);
        const docRef = doc(db, "questions", id, "replies", docId);
        batch.delete(docRef);

        await batch.commit();

    }

    return(
        <>
            <div className='each-reply'>
                <div>
                    <h2>{reply.data().text}</h2>
                    <div>
                        <span style = {{color: liked ? "var(--liked)" : "" }} onClick={()=>handleLike(reply.id)}>
                            <p>{likeCount}</p>
                            <ThumbUpRoundedIcon />
                        </span>
                        <span style = {{color: reported ? "var(--reported)" : "" }} onClick={()=>handleReport(reply.id)}>
                            <p>{reportCount}</p>
                            <FlagIcon />
                        </span>
                        {
                            auth.currentUser.uid === reply.data().createdBy &&
                            <span className = "deleteButton" onClick = {()=>handleDelete(id)}>
                                <DeleteForeverIcon />
                            </span>
                        }
                    </div>
                </div>
                <p style={{ textAlign: "right" }}>- {reply.data().author}</p>
            </div>
            <br />
        </>
    )
}

export default Reply;