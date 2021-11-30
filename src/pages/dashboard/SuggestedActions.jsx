import { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, where, limit, getDocs } from "@firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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
                        <CircularProgress color='primary'></CircularProgress>
                    </div>
                ) : (
                    suggestedQuestions.map((doc) => {
                        return <EachSuggestedQuestion data={doc.data} id={doc.id} key={doc.id}></EachSuggestedQuestion>;
                    })
                )}
            </div>
            <div className='random-button-container'>
                <Button variant='contained'>Create a Review</Button>
                <Button variant='contained'>Browse Reviews</Button>
                <Button variant='contained'>Browse Questions</Button>
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
                    return (
                        <Button variant='outlined' style={{ borderRadius: 1 + "rem", marginRight: 0.5 + "rem" }}>
                            {tag}
                        </Button>
                    );
                })}
            </div>
            <Link to={"/question/" + params.id}>Reply</Link>
        </div>
    );
};
export default SuggestedActions;
