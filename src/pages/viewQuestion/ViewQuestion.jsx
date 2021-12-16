import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router";
import { getFirestore, getDoc, getDocs, collection, doc, query, orderBy } from "@firebase/firestore";
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
    useEffect(() => {
        // Load in question data
        if (!loading && user) {
            getQuestionAndReplies();
        }
    }, [loading]);
    const getQuestionAndReplies = async () => {
        const questionRef = doc(db, "questions", params.id);
        const document = await getDoc(questionRef);

        setData(document.data());
        if (document.data().likedBy.includes()) {
        }
        const collectionRef = collection(questionRef, "replies");
        const q = query(collectionRef, orderBy("likes", "asc"));
        const querySnapshot = await getDocs(q);
        let repliesArray = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            doc.data().id = doc.id;
            repliesArray.push(doc.data());
        });

        setReplies(repliesArray);
        setLoading(false);
    };
    const setLike = async () => {};
    return (
        <>
            <Navbar></Navbar>
            {!loadingData ? (
                <div className='view-replies-container'>
                    <h1>{data.text}</h1>
                    <div>
                        {replies.length === 0 ? (
                            <div>
                                <h2>There are no replies yet.</h2>
                            </div>
                        ) : (
                            replies.map((eachData) => {
                                return (
                                    <div key={eachData.id} className='each-reply'>
                                        <div>
                                            <h2>{eachData.text}</h2>
                                            <span onClick={setLike}>
                                                <p>{eachData.likes}</p>
                                                <ThumbUpRoundedIcon></ThumbUpRoundedIcon>
                                            </span>
                                        </div>
                                        <p style={{ textAlign: "right" }}>- {eachData.displayName}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <CircularProgress />
                </div>
            )}
            <div className='replies-entry'>
                <textarea placeholder='Write your response here...'></textarea>
                <div>
                    <Button variant='contained'>Submit</Button>
                </div>
            </div>
        </>
    );
};
export default ViewQuestion;
