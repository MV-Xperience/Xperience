import { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, where, limit, onSnapshot } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import Loading from "../../components/loading/Loading";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

const db = getFirestore();
const SuggestedActions = (params) => {
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [suggestedQuestions, setSuggestedQuestions] = useState([]);

    const btnStyle = {
        wordBreak: 'keep-all',
        whiteSpace: 'nowrap',
    }

    // In the future, use IN to give the person questions based on classes they've taken or reviewed
    // In the future, could order by replies < 0
    // In the future, could use an array peopleToIgnore, to make sure they aren't always spammed with the same recommendation
    useEffect(() => {
        const questionCollection = collection(db, "questions");
        const q = query(questionCollection, where("numReplies", "==", 0), orderBy("date", "desc"), limit(3));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let fullArray = [];
            querySnapshot.forEach((doc) => {
                fullArray.push({ id: doc.id, data: doc.data() });
            });
            fullArray = fullArray.filter((question) => question.data.uid !== auth.currentUser.uid);
            setSuggestedQuestions(fullArray);              
        });
        setLoading(false);
        return () => {
            unsubscribe();
        }
        
    }, [params, auth]);
    
    return (
        <div className='suggested-actions-container'>
            <div className='your-questions-title text-right'>
                <h1>Suggested Actions</h1>
            </div>
            <div className='suggested-questions-container'>
                <p style={{ fontWeight: 500, marginTop: 0 }}>Answer relevant questions:</p>
                {loading ? (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Loading />
                    </div>
                ) : (
                    suggestedQuestions.map((doc, index) => {
                        return <EachSuggestedQuestion data={doc.data} id={doc.id} key={`${index}esq`} />;
                    })
                )}
            </div>
            <div className='button-container'>
                <Link to = {{pathname: '/review'}}><Button variant='contained' sx={btnStyle}>Create a Review</Button></Link>
                <Link to = {{pathname: '/browse-questions'}}><Button variant='contained' sx={btnStyle}>Browse Questions</Button></Link>
                <Link to = {{pathname: '/browse-reviews'}}><Button variant='contained' sx={btnStyle}>Browse Reviews</Button></Link>
            </div>
        </div>
    );
};
const EachSuggestedQuestion = (params) => {
    return (
        <div className='each-suggested-question'>
            <p>{params.data.text}</p>
            <div className='each-suggested-question-tag'>
                {params.data.tags.map((tag, index) => {
                    return(
                        <Link to = {"/browse-questions/" + tag}  key={`${index}esqt`} >
                             <Chip style={{ borderRadius: 1 + "rem", marginRight: 0.5 + "rem" }} color='primary' clickable={true} label={tag} variant='outlined' />
                        </Link>
                    )
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
