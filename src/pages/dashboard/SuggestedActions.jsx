import { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, where, limit, getDocs } from "@firebase/firestore";
import Loading from "../../components/loading/Loading";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
const db = getFirestore();
const SuggestedActions = (params) => {
    const [loading, setLoading] = useState(true);
    const [suggestedQuestions, setSuggestedQuestions] = useState([]);
    // In the future, use IN to give the person questions based on classes they've taken or reviewed
    // In the future, could order by replies < 0
    // In the future, could use an array peopleToIgnore, to make sure they aren't always spammed with the same recommendation
    useEffect(() => {
        if (!params.loading && params.user !== null) {
            // Get the questions from the query
            console.log("Starting");
            const questionCollection = collection(db, "questions");
            const q = query(questionCollection, where("numReplies", "==", 0), orderBy("date", "desc"), limit(3));
            getDocuments(q);
        }
    }, [params]);
    async function getDocuments(q) {
        const querySnapshot = await getDocs(q);
        console.log("Got documents");
        let fullArray = [];
        querySnapshot.forEach((doc) => {
            console.log("Matching information:", doc.id, doc.data());
            fullArray.push({ id: doc.id, data: doc.data() });
        });
        setSuggestedQuestions(fullArray);
        setLoading(false);
    }
    return (
        <div className='suggested-actions-container'>
            <div className='your-questions-title'>
                <h1>Suggested Actions</h1>
            </div>
            <div className='suggested-questions-container'>
                <p style={{ fontWeight: 500, marginTop: 0 }}>Answer relevant questions:</p>
                {loading ? (
                    <div style={{ width: 100 + "%", display: "flex", justifyContent: "center" }}>
                        <Loading />
                    </div>
                ) : (
                    suggestedQuestions.map((doc) => {
                        return <EachSuggestedQuestion data={doc.data} id={doc.id} key={doc.id} />;
                    })
                )}
            </div>
            <div className='button-container'>
                <Link to = {{pathname: '/review'}}><Button variant='contained'>Create a Review</Button></Link>
                <Button variant='contained'>Browse Questions</Button>
                <Button variant='contained'>Browse Reviews</Button>
            </div>
        </div>
    );
};
const EachSuggestedQuestion = (params) => {
    return (
        <div className='each-suggested-question'>
            <p>{params.data.text}</p>
            <div className='each-suggested-question-tag'>
                {params.data.tags.map((tag) => {
                    return <Chip style={{ borderRadius: 1 + "rem", marginRight: 0.5 + "rem" }} color='primary' clickable={true} label={tag} variant='outlined'></Chip>;
                })}
            </div>
            <Link to={"/question/" + params.id} className='reply-each-question'>
                Reply
                <ReplyRoundedIcon />
            </Link>
        </div>
    );
};
export default SuggestedActions;
