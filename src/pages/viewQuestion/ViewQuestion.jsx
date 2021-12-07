import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router";
import { getFirestore, getDoc, getDocs, collection, doc, query, orderBy } from "@firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import "./viewQuestion.css";
const db = getFirestore();
const ViewQuestion = () => {
    const params = useParams();
    const [data, setData] = useState("none");
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Load in question data
        getQuestionAndReplies();
    }, []);
    const getQuestionAndReplies = async () => {
        const questionRef = doc(db, "questions", params.id);
        const document = await getDoc(questionRef);

        setData(document.data());

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
    return (
        <>
            <Navbar></Navbar>
            {!loading ? (
                <div className='view-replies-container'>
                    <h1>{data.text}</h1>
                    <div>
                        {replies.length == 0 ? (
                            <></>
                        ) : (
                            replies.map((eachData) => {
                                return (
                                    <div key={eachData.id} className='each-reply'>
                                        <h2>{eachData.text}</h2>
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
        </>
    );
};
export default ViewQuestion;
