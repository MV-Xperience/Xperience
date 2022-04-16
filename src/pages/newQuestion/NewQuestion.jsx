import "./newquestion.css";
import Navbar from "../../components/navbar/Navbar";
import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { getFirestore, addDoc, collection, serverTimestamp, doc, updateDoc, arrayUnion } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";

import Alert from "@mui/material/Alert";

const NewQuestion = () => {
    const tagInput = useRef(null);
    const questionInput = useRef(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const db = getFirestore();
    const auth = getAuth();
    const [tags, setTags] = useState([]);
    const [user] = useAuthState(auth);
    let navigate = useNavigate();
    
    useAuthRedirect();

    const addTag = (e) => {
        e.preventDefault();
        if (tags.length < 5) {
            if (!tags.includes(tagInput.current.value.toUpperCase())) {
                setTags([...tags, tagInput.current.value.toUpperCase()]);
            } else {
                setShowError(true);
                setErrorMessage("You can only add unique tags");
                window.setTimeout(() => {
                    setShowError(false);
                }, 2000);
            }
        } else {
            setShowError(true);
            setErrorMessage("You can only add up to 5 tags");
            window.setTimeout(() => {
                setShowError(false);
            }, 2000);
        }
        tagInput.current.value = "";
    };
    const removeItem = (tagToRemove) => {
        let array = [...tags];
        array = array.filter((tag) => {
            return tag !== tagToRemove;
        });
        setTags(array);
    };
    const writeToFirestore = async () => {
        let data = {};
        data.likes = 0;
        data.reports = 0;
        data.numReplies = 0;
        data.tags = tags;
        data.text = questionInput.current.value;
        data.uid = user.uid;
        data.displayName = user.displayName;
        data.date = serverTimestamp();
        data.resolved = false;
        data.likedBy = [];
        data.reportedBy = [];
        
        const docRef = await addDoc(collection(db, "questions"), data);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { questionIds: arrayUnion(docRef.id) });

        navigate("/question/" + docRef.id);
    };
    return (
        <>
            <Navbar />
            <div className='new-question-container'>
                <h1>Ask a Question</h1>
                <h2>Question:</h2>
                <textarea className='actual-question-input' label='Question' ref={questionInput} placeholder='Is ... easy if I took ...?' rows='4'></textarea>
                <h2>Add Tags:</h2>
                <div className='tag-input-container'>
                    <form onSubmit={addTag}>
                        <input placeholder='eg. apcs, freshman' ref={tagInput}></input>
                        <input type='submit' style={{ display: "none" }}></input>
                    </form>
                    {tags.map((tag) => {
                        return (
                            <div className='each-tag-entry' key={tag}>
                                <p>{tag}</p>
                                <button
                                    onClick={() => {
                                        removeItem(tag);
                                    }}>
                                    <CloseIcon />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <br />
                {showError ? (
                    <Alert severity='error' className='fade-in-alert'>
                        {errorMessage}
                    </Alert>
                ) : (
                    <></>
                )}

                <div style={{ marginTop: "2rem" }}>
                    <Button variant='contained' size='large' onClick={writeToFirestore}>
                        Post
                    </Button>
                </div>
            </div>
        </>
    );
};
export default NewQuestion;
