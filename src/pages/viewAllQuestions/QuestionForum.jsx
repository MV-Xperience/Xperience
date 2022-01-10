import useAuthRedirect from "../../hooks/useAuthRedirect";
import Navbar from "../../components/navbar/Navbar";

import './questionForum.css';

import {useState} from 'react';

const QuestionForum = () => {
    
    useAuthRedirect();


    const [tagFilter, setTagFilter] = useState("");

    return (
    <>  
        <Navbar />
        <div className="forumContainer">
            <div className="title"> 
                <h1>Questions</h1>
            </div>
            <div className="tagFilter">
                <input type='text' required value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} placeholder='Search for the tags...' />
            </div>
            <div className="forum">
                
            </div>
        </div>
    </>
    )
}

export default QuestionForum;