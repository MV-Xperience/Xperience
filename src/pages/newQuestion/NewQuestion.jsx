import "./newquestion.css";
import Navbar from "../../components/navbar/Navbar";
const NewQuestion = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='new-question-container'>
                <h1>Ask a Question</h1>
                <h2>Question:</h2>
            </div>
        </>
    );
};
export default NewQuestion;
