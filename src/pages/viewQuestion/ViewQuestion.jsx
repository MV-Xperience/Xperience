import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Reply from "../../components/reply/Reply";
import { useParams } from "react-router";
import { getFirestore, getDoc, addDoc, updateDoc, collection, doc, query, orderBy, onSnapshot} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";


import "./viewQuestion.css";
const db = getFirestore();
const auth = getAuth();
const ViewQuestion = () => {
    const {id} = useParams();
    const [data, setData] = useState("none");
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyInput, setReplyInput] = useState("");

    useEffect(() => {
        // Load in question data
       
        const getQuestionAndReplies = async () => {
            const questionRef = doc(db, "questions", id);
            const document = await getDoc(questionRef);
    
            setData(document.data());
            const collectionRef = collection(db, "questions/" + id + "/replies");
            const q = query(collectionRef, orderBy("likes", "desc"));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let tempArr = [];
                querySnapshot.forEach((doc) => {
                    tempArr.push(doc);
                });
                tempArr = tempArr.filter((reply) => reply.data().reports < 3)
                setReplies(tempArr);

            });
 
            setLoading(false);

            return ()=>unsubscribe();

        };

        getQuestionAndReplies();

    }, [id]);

    const handleAddReply = async (question) => {
        setLoading(true);
        if(replyInput !== "") {
            const collectionRef = collection(db, "questions/" + question + "/replies");
            const replyObj = {
                text: replyInput,    
                likedBy: [],
                reportedBy: [],
                likes: 0,
                reports: 0,
                createdAt: new Date(),
                createdBy: auth.currentUser.uid,
                author: auth.currentUser.displayName,
            };
            await addDoc(collectionRef, replyObj);

            await updateDoc(doc(db, "questions", question), {
                numReplies: data.numReplies + 1
            })
            
            setReplyInput("");
            setLoading(false);
        }
    }
    return (
        <>
            <Navbar />
            {!loading ? (
                <div className='view-replies-container'>
                    <h1>{data.text}</h1>
                    <div className="replies-scroll">
                        {
                            replies.length === 0 ? <h3>No Replies Yet!</h3> : 
                            <>
                                {
                                replies.map((reply) => {
                                    return (
                                        <Reply key={reply.id} reply = {reply} id = {id}/>
                                    );
                                })}
                            </>
                        }
                    </div>
                </div>
            ) : (
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "7vh"}}>
                    <CircularProgress size = {100}/>
                </div>
            )}
            <div className='replies-entry'>
                <textarea maxLength='500' value = {replyInput} onChange = {(e)=>setReplyInput(e.target.value)} placeholder='Write your response here...' />
                <div>
                    <Button variant='contained' onClick = {()=>handleAddReply(id)}>Submit</Button>
                </div>
            </div>
        </>
    );
};
export default ViewQuestion;
