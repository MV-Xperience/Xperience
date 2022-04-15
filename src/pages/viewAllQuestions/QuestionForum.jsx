import useAuthRedirect from "../../hooks/useAuthRedirect";
import './questionForum.css';
import IndQuestion from "../../pages/dashboard/IndQuestion";

import {useState, useEffect} from 'react';
import Navbar from "../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import classNames from "../../data/classNames2122.json";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore"; 
import {Link} from 'react-router-dom';  
import Loading from "../../components/loading/Loading";
const QuestionForum = () => {
    
    useAuthRedirect();
    const [questions, setQuestions] = useState([]);
    const [searched, setSearched] = useState(false);
    const db = getFirestore();

    const [searchedTag, setSearchedTag] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getInitialData = async () => {
            const querySnapshot = await getDocs(collection(db, "questions"));
            const tempArr = [];
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              tempArr.push(doc);
            });

            setQuestions(tempArr);
            setLoading(false);

        }
        
        getInitialData()
    } , []);

    const getData = async () => {
        setSearched(true);
        const q = query(collection(db, 'questions'), where("tags", "array-contains", searchedTag));

        const querySnapshot = await getDocs(q);
        const tempArr = [];

        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            tempArr.push(doc);

        });
        
        setQuestions(tempArr);
    }

    return (
        <>  
            <Navbar />
                <div className="browse-page">
                    <div className="content">
                        <div className='mainText' >
                            <h1 className='pageHeading'>Question Forum</h1>
                        </div>
                        <div className="form-browse">
                            <input type='text' value={searchedTag} onChange={(e) => setSearchedTag(e.target.value)} placeholder='Search by tags.' />
                            <Button onClick = {getData} variant='contained' size='large'>Search</Button>
                        </div>
                        <br />
                    </div>
                    
                    {
                        questions.length > 0 ?
                        <>
                            <div className="questionContainer">
                                <h1>Questions</h1>
                                {questions.map((doc) => {
                                    return <IndQuestion key={doc.id} data={doc.data()} id={doc.id} />
                                })}
                            </div>
                        </>
                        :
                        <>
                        {
                            searched &&
                                <div className="noReviewContainer">
                                <h1>No Questions For This Tag!</h1>
                                <Link to = '/question/new'><h3>Click here to ask a new questions</h3></Link>
                            </div>
                        }   
                        </>
                    }
                    <div className = "askMore">
                        <h2>
                            Have more questions?{" "}
                            <Link to='/question/new' style={{ marginLeft: 0.25 + "rem" }}>
                                <Button variant='contained'>Ask them here</Button>
                            </Link>
                        </h2>
                    </div>
                </div>
               
        </>
    )
}

export default QuestionForum;