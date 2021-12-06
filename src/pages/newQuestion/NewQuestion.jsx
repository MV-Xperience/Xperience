import "./newquestion.css";
import Navbar from "../../components/navbar/Navbar";
import { useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { getFirestore, addDoc, collection, serverTimestamp, doc, updateDoc, arrayUnion } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
const db = getFirestore();
const auth = getAuth();
const NewQuestion = () => {
    const tagInput = useRef(null);
    const questionInput = useRef(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [tags, setTags] = useState([]);
    const [user, loading] = useAuthState(auth);
    let navigate = useNavigate();
    useEffect(() => {
        if (!loading) {
            if (user) {
            } else {
                navigate("/login");
            }
        }
    }, [loading, navigate, user]);
    const addTag = (e) => {
        e.preventDefault();
        console.log(tagInput.current.value);
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
        console.log(array);
        setTags(array);
    };
    const writeToFirestore = async () => {
        let data = {};
        data.likes = 0;
        data.numReplies = 0;
        data.tags = tags;
        data.text = questionInput.current.value;
        data.uid = user.uid;
        data.displayName = user.displayName;
        data.date = serverTimestamp();
        data.resolved = false;
        console.log(data);
        const docRef = await addDoc(collection(db, "questions"), data);
        console.log("Document created! ID:", docRef.id);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { questionIds: arrayUnion(docRef.id) });

        navigate("/question/" + docRef.id);
    };
    return (
        <>
            <Navbar></Navbar>
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
