import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router";
import { getFirestore, getDoc, addDoc, getDocs, collection, doc, query, orderBy } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import "./viewQuestion.css";
const db = getFirestore();
const auth = getAuth();
const ViewQuestion = () => {
    const params = useParams();
    const [data, setData] = useState("none");
    const [replies, setReplies] = useState([]);
    const [loadingData, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [reply, setReply] = useState("");
    useEffect(() => {
        // Load in question data
       
        const getQuestionAndReplies = async () => {
            const questionRef = doc(db, "questions", params.id);
            const document = await getDoc(questionRef);
    
            setData(document.data());
            
            const collectionRef = collection(db, "questions/" + params.id + "/replies");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            let tempArr = [];

            querySnapshot.forEach((doc) => {
                tempArr.push(doc);
            });
            
            setReplies(tempArr);
            setLoading(false);            
           
        };

        getQuestionAndReplies();

    }, [loading, user]);
    
    const setLike = async () => {

    };

    const handleAddReply = async (question) => {
        setLoading(true);
        if(reply !== "") {
            const collectionRef = collection(db, "questions/" + question + "/replies");
            const replyObj = {
                text: reply,    
                likedBy: [],
                createdAt: new Date(),
                createdBy: auth.currentUser.uid,
                author: auth.currentUser.displayName,
            };
            await addDoc(collectionRef, replyObj);
            setReply("");
            setLoading(false);
            alert("Reply added!");
        }
    }
    return (
        <>
            <Navbar />
            {!loadingData ? (
                <div className='view-replies-container'>
                    <h1>{data.text}</h1>
                    <div className="replies-scroll">
                        {
                        replies.map((reply) => {
                            return (
                                <>
                                    <div key={reply.id} className='each-reply'>
                                        <div>
                                            <h2>{reply.data().text}</h2>
                                            <span onClick={setLike}>
                                                <p>{reply.data().likedBy.length}</p>
                                                <ThumbUpRoundedIcon />
                                            </span>
                                        </div>
                                        <p style={{ textAlign: "right" }}>- {reply.data().author}</p>
                                    </div>
                                    <br />
                                </>
                            );
                        })}
                        {
                            replies.length === 0 && <h3>No Replies Yet!</h3>
                        }
                    </div>
                </div>
            ) : (
                <div>
                    <CircularProgress />
                </div>
            )}
            <div className='replies-entry'>
                <textarea value = {reply} onChange = {(e)=>setReply(e.target.value)} placeholder='Write your response here...'></textarea>
                <div>
                    <Button variant='contained' onClick = {()=>handleAddReply(params.id)}>Submit</Button>
                </div>
            </div>
        </>
    );
};
export default ViewQuestion;
