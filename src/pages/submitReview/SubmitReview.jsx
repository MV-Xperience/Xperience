import { useState } from "react";
import "./submitReview.css";
import classNames from "../../data/classNames2122.json";
import Navbar from "../../components/navbar/Navbar";
import Loading from "../../components/loading/Loading";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { getFirestore, writeBatch, doc, arrayUnion, increment } from "firebase/firestore";
import useAuthRedirect from "../../hooks/useAuthRedirect";

import { getAuth } from "@firebase/auth";


const ReviewSubmitter = () => {
    
    useAuthRedirect();

    const [classInput, setClassInput] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [learningInput, setLearningInput] = useState(4);
    const [timeInput, setTimeInput] = useState(60);
    const [stressInput, setStressInput] = useState(2);
    const [difficultyInput, setDifficultyInput] = useState(3);
    const [yearInput, setYearInput] = useState("");

    const [loading, setLoading] = useState(false);

    const db = getFirestore();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const classId = classNames[classInput]?.code;

        if (!classId) {
            setLoading(false);
            alert("Your class name, " + classInput + " is not in our list of classes. Please choose a class in the dropdown.");
            return;
        } else {
            const batch = writeBatch(db);

            batch.update(doc(db, `users/${getAuth().currentUser.uid}`), {
                reviewedClasses: arrayUnion(classId),
            });

            const reviewData = {
                author: auth.currentUser.displayName,
                class: classInput,
                difficulty: difficultyInput,
                learningLevel: learningInput,
                stressLevel: stressInput,
                time: timeInput,
                rating: rating,
                review: review,
                year: yearInput,
                likes: 0,
                reports: 0,
                uid: auth.currentUser.uid,
                likedBy: [],
                helpfulBy: [],
                reportedBy: [],
            };

            const classRef = doc(db, `classes/${classId}`);

            batch.update(doc(db, "users/" + getAuth().currentUser.uid), {
                reviewedClasses: arrayUnion(classId),
            });

            batch.set(doc(classRef, `/reviews/${getAuth().currentUser.uid}`), reviewData);
            const updateData = {
                reviewCt: increment(1),
                sumOfStars: increment(rating),
                sumOfDiffulty: increment(difficultyInput),
                sumOfLearning: increment(learningInput),
                sumOfStress: increment(stressInput),
                sumOfTimeCommit: increment(timeInput),
            };

            batch.update(classRef, updateData);

            await batch.commit().then(() => {
                setClassInput("");
                setRating(0);
                setReview("");
                setLearningInput(4);
                setTimeInput(60);
                setStressInput(2);
                setDifficultyInput(3);
                setYearInput("");
                setLoading(false);
                alert("Your review has been submitted!");
            });
        }
        return false;
    };

    const thumbStyle = {
        color: "primary",
        width: "3vh",
        height: "3vh",
    };

    const sliderStyles = {
        width: "25vw",
        height: "2vh",
        "& .MuiSlider-thumb": thumbStyle,
        color: "primary",
    };

    return (
        <>
            <Navbar />
            {loading && <Loading />}
            <div className='pageContent'>
                <div className='mainText' >
                    <h1 className='pageHeading'>Submit A Review</h1>
                </div>
                <datalist id='classes'>
                    {Object.keys(classNames).map((className, index) => {
                        return <option key={index} value={className}></option>;
                    })}
                </datalist>
                <form id='enterReview' onSubmit={handleSubmit}>
                    {/* <div className='titlesforReview required'>Class Name</div> */}
                    <input type='text' required value={classInput} list='classes' onChange={(e) => setClassInput(e.target.value)} placeholder='Search for the class you are reviewing...' />
                    <div className='inputRating'>
                        <h3>Rating</h3>
                        <Rating
                            sx={{ fontSize: "3em" }}
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </div>
                    <div className='horizontalReviewDiv'>
                        <textarea
                            value={review}
                            type='text'
                            id='reviewSelector'
                            required
                            placeholder='Write a thoughful review here!'
                            maxLength='600'
                            onChange={(e) => {
                                setReview(e.target.value);
                            }}></textarea>

                        <div className='reviewSliderDiv'>
                            <div className='titlesforReview'>What Level of Stress Did This Class Give You</div>
                            <Slider
                                valueLabelDisplay='hover'
                                value={stressInput}
                                min={0}
                                max={5}
                                step={1}
                                required
                                defaultValue={2}
                                sx={sliderStyles}
                                onChange={(event, newValue) => {
                                    setStressInput(newValue);
                                }}></Slider>
                            <div className='titlesforReview'>How Much Did You Learn In This Class</div>
                            <Slider
                                valueLabelDisplay='hover'
                                value={learningInput}
                                min={0}
                                max={5}
                                step={1}
                                required
                                defaultValue={4}
                                sx={sliderStyles}
                                onChange={(event, newValue) => {
                                    setLearningInput(newValue);
                                }}></Slider>
                            <div className='titlesforReview'>How Difficult Was This Class</div>
                            <Slider
                                valueLabelDisplay='hover'
                                value={difficultyInput}
                                min={0}
                                max={5}
                                step={1}
                                required
                                defaultValue={3}
                                sx={sliderStyles}
                                onChange={(event, newValue) => {
                                    setDifficultyInput(newValue);
                                }}></Slider>
                            <div className='titlesforReview'>Average Time Commitment Per Day</div>
                            <Slider
                                valueLabelDisplay='hover'
                                value={timeInput}
                                min={0}
                                max={180}
                                step={15}
                                required
                                defaultValue={60}
                                sx={sliderStyles}
                                onChange={(event, newValue) => {
                                    setTimeInput(newValue);
                                }}></Slider>
                            <div className='titlesforReview'>What Year Did You Take This Class</div>
                            <input
                                type='text'
                                value={yearInput}
                                onChange={(e) => {
                                    setYearInput(e.target.value);
                                }}
                                placeholder='Year'
                                className='year-input'></input>
                        </div>
                    </div>
                    <Button variant='contained' size='large' type='submit'>
                        Submit
                    </Button>

                    {/* <input type='Submit' id='subMainButton' className='reviewSubmit'>
                    </input> */}
                    {/* <div className='titlesforReview required'>General Review</div> */}
                </form>
            </div>
        </>
    );
};

export default ReviewSubmitter;
