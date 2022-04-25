import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IndQuestion from "./IndQuestion";
import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
const db = getFirestore();
const YourQuestions = (params) => {
    const [questionData, setQuestionData] = useState([]);
    const [loading, setLoading] = useState(true);
    // Get data from firestore
    useEffect(() => {
        const getAllData = async(userRef) =>{
            const document = await getDoc(userRef);
            let allQuestionIds = document.data().questionIds;
    
            if(document.data().banned){
                params.setBanned(true);
            }
    
            let arrayOfData = [];
            for (let i = 0; i < 5 && i < allQuestionIds.length; i++) {
                let individualReference = doc(db, "questions", allQuestionIds[i]);
                let individualData = await getDoc(individualReference);
                if (individualData.exists()) {
                    arrayOfData.push({ data: individualData.data(), id: allQuestionIds[i] });
                }
            }
    
            setQuestionData(arrayOfData);
            setLoading(false);
        }

        if (!params.loading && params.user !== null) {
            // Load in everything!
            const userDocRef = doc(db, "users", params.user.uid);
            getAllData(userDocRef);
        }
    }, [params]);
    
    

    return (
        <div className='your-questions-container'>
            <div className='your-questions-title text-left'>
                <h1>
                    Your Recent Questions
                </h1>
                <Link to='/question/new'>
                    <Fab color='primary' aria-label='add' style={{ fontSize: "1.5rem" }}>
                        +
                    </Fab>
                </Link>
            </div>
            <div className='all-questions-container'>
                {loading ? (
                    <div style={{ width: 100 + "%", display: "flex", justifyContent: "center" }}>
                        <CircularProgress color='primary'></CircularProgress>
                    </div>
                ) : (
                    <> 
                        {questionData.map((doc) => {
                            return <IndQuestion key={doc.id} data={doc.data} id={doc.id} setQuestions = {setQuestionData} />
                        })}
                        {
                            questionData.length === 0 ? (
                                <div className='no-questions-wrapper'>
                                    You have not asked any questions
                                </div>
                            ) : <></>
                        }
                        {questionData.length < 4 ? (
                            <h2 className="ask-more-questions">
                                <span>Have more questions?</span>
                                <Link to='/question/new'>
                                    <Button variant='contained'>Ask them here</Button>
                                </Link>
                            </h2>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default YourQuestions;
