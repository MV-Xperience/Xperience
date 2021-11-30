import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IndQuestion from "./IndQuestion";
import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();
const YourQuestions = (params) => {
    const [questionData, setQuestionData] = useState([]);
    const [loading, setLoading] = useState(true);
    // Get data from firestore
    useEffect(() => {
        if (!params.loading) {
            // Load in everything!
            console.log(params.user.uid);
            const userRef = doc(db, "users", params.user.uid);
            getAllData(userRef);
        }
    }, [params.loading]);
    async function getAllData(userRef) {
        const document = await getDoc(userRef);
        let allQuestionIds = document.data().questionIds;

        let arrayOfData = [];
        for (let i = 0; i < 5 && i < allQuestionIds.length; i++) {
            let individualReference = doc(db, "questions", allQuestionIds[i]);
            let individualData = await getDoc(individualReference);
            if (individualData.exists()) {
                arrayOfData.push({ data: individualData.data(), id: allQuestionIds[i] });
            } else {
                console.log("Wait this one doesn't exist");
            }
        }

        setQuestionData(arrayOfData);
        setLoading(false);
        console.log("Done");
    }

    return (
        <div className='your-questions-container'>
            <div className='your-questions-title'>
                <h1>Your Recent Questions</h1>
                <Fab color='primary' aria-label='add' style={{ fontSize: "1.5rem" }}>
                    +
                </Fab>
            </div>
            <div className='all-questions-container'>
                {loading ? (
                    <div style={{ width: 100 + "%", display: "flex", justifyContent: "center" }}>
                        <CircularProgress color='primary'></CircularProgress>
                    </div>
                ) : (
                    <>
                        {questionData.map((doc) => {
                            return <IndQuestion key={doc.id} data={doc.data} id={doc.id}></IndQuestion>;
                        })}
                        {questionData.length < 4 ? (
                            <h2 style={{ marginTop: "auto" }}>
                                Have more questions? <Button variant='contained'>Ask them here</Button>
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
