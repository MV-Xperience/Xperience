import "./newquestion.css";
import Navbar from "../../components/navbar/Navbar";
import TextField from "@mui/material/TextField";
const NewQuestion = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='new-question-container'>
                <h1>Ask a Question</h1>
                <h2>Question:</h2>
                <textarea className='actual-question-input' label='Question' placeholder='Is ... easy if I took ...?'></textarea>
                <h2>Add Tags:</h2>
                <div className='tag-input-container'>
                    <input placeholder='eg. apcs, freshman'></input>
                </div>
            </div>
        </>
    );
};
export default NewQuestion;
