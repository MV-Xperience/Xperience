import { useState } from "react";
import "./submitReview.css";
import classNames from "../../data/classNames2122.json";
import Navbar from "../../components/navbar/Navbar";
import Loading from "../../components/loading/Loading";
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';

import { getFirestore, collection, addDoc, doc, updateDoc, getDoc} from "@firebase/firestore";
import {getAuth} from "@firebase/auth";

const ReviewSubmitter = () => {
    const [classInput, setClassInput] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [learningInput, setLearningInput] = useState(4);
    const [timeInput, setTimeInput] = useState(60);
    const [stressInput, setStressInput] = useState(2);
    const [difficultyInput, setDifficultyInput] = useState(3);
    const [yearInput, setYearInput] = useState('');


    const [loading, setLoading] = useState(false);

    const db = getFirestore();

    const handleSubmit = async(e) => {
        setLoading(true);
        
        const classId = classNames[classInput]?.code;

        if (!classId) {
            setLoading(false);
            alert("Your class name, " + classInput + " is not in our list of classes. Please choose a class in the dropdown.");
            return;
        }
        else{
            await addDoc(collection(db, `classes/${classId}/reviews`), {
                author: getAuth().currentUser.displayName,
                class: classInput,
                difficulty: difficultyInput,
                learningLevel: learningInput,
                stressLevel: stressInput,
                time: timeInput,
                rating: rating,
                review: review,
                year: yearInput,
                helpfulCount: 0,
                likeCount: 0,
                reportCount: 0
            })

            const classDoc = await getDoc(doc(db, `classes/${classId}`));
            await updateDoc(doc(db, 'classes', `${classId}`), {
                reviewCt: classDoc.reviewCt + 1,
                sumOfStars: classDoc.sumOfStars + rating,
                sumOfDiffulty: classDoc.sumOfDiffulty + difficultyInput,
                sumOfLearning: classDoc.sumOfLearning + learningInput,
                sumOfStress: classDoc.sumOfStress + stressInput,
                sumOfTimeCommit: classDoc.sumOfTimeCommit + timeInput,
            }).then(() => {
                setClassInput('')
                setRating(0)
                setReview('')
                setLearningInput(4)
                setTimeInput(60)
                setStressInput(2)
                setDifficultyInput(3)
                setYearInput('');
                setLoading(false);
                alert("Your review has been submitted!");
            })
        }
    };

    const thumbStyle = {
        color: 'primary', 
        width: '3vh',
        height: '3vh',
    }

    const sliderStyles = {
        width: '25vw',
        height: '2vh',
        '& .MuiSlider-thumb': thumbStyle,
        color: 'primary',
    }

    
    return (
        <>
            <Navbar />
            {loading ? <Loading /> : 
            <div className='pageContent'>
                <div className='mainText' style={{ width: "" }}>
                    <h1 className='pageHeading'>Submit A Review</h1>
                </div>
                <datalist id='classes'>
                    {Object.keys(classNames).map((className, index) => {
                        return <option key = {index} value={className}></option>;
                    })}
                </datalist>
                <form id='enterReview' onSubmit={handleSubmit}>
                    {/* <div className='titlesforReview required'>Class Name</div> */}
                    <input type='text' required value={classInput} list='classes' onChange = {(e)=>setClassInput(e.target.value)}placeholder='Search for the class you are reviewing...'></input>
                        <div className = 'inputRating'>
                            <h2>Rating</h2>
                            <Rating sx = {{fontSize: '3em'}} value={rating} onChange={(event, newValue) => {setRating(newValue)}}/>
                        </div>
                    <div className='horizontalReviewDiv'>
                        <textarea
                            value={review}
                            type='text'
                            id='reviewSelector'
                            required
                            placeholder='Write a thoughful review here!'
                            maxLength="500"
                            onChange={(e) => {setReview(e.target.value)}}
                            >    
                        </textarea>

                        <div className='reviewSliderDiv'>
                            <div className='titlesforReview'>What Level of Stress Did This Class Give You</div>
                            <Slider valueLabelDisplay="on" value={stressInput} min={0} max={5} step = {1} required defaultValue={2} sx = {sliderStyles} onChange={(event, newValue) => {setStressInput(newValue)}}></Slider>
                            <div className='titlesforReview'>How Much Did You Learn In This Class</div>
                            <Slider valueLabelDisplay="on" value={learningInput} min={0} max={5} step={1} required defaultValue={4} sx = {sliderStyles} onChange={(event, newValue) => {setLearningInput(newValue)}}></Slider>
                            <div className='titlesforReview'>How Difficult Was This Class</div>
                            <Slider valueLabelDisplay="on" value={difficultyInput} min={0} max={5} step={1} required defaultValue={3} sx = {sliderStyles} onChange={(event, newValue) => {setDifficultyInput(newValue)}}></Slider>
                            <div className='titlesforReview'>Average Time Commitment Per Day</div>
                            <Slider valueLabelDisplay="on" value={timeInput} min={0} max={180} step={15} required defaultValue={60} sx = {sliderStyles} onChange={(event, newValue) => {setTimeInput(newValue)}}></Slider>
                        </div>
                    </div>
                    <input type='Submit' id='subMainButton' className='reviewSubmit'/>
                    {/* <div className='titlesforReview required'>General Review</div> */}
                </form>
            </div>}
        </>
    );
};

export default ReviewSubmitter;