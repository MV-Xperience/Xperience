import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, orderBy, query, collection, getDocs, limit, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { useEffect, useState } from "react";

import Loading from "../../components/loading/Loading";
import Navbar from "../../components/navbar/Navbar";
import IndRating from "./IndRating";
import NoReview from "./NoReview";
import Review from "./Review";

import "./class.css";

import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import Chip from "@mui/material/Chip";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckIcon from "@mui/icons-material/Check";

const db = getFirestore();
const auth = getAuth();
const Class = () => {
    let { id } = useParams();

    const [classData, setClassData] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [user, loading, error] = useAuthState(auth);
    const [classReviewData, setClassReviewData] = useState({});

    // nested object
    // first key is the id of the review being used
    // second (nested) key is for report, helpful, liked - if this person has liked it essentially
    const [reviewAttributes, setReviewAttributes] = useState({ id: { like: "", helpful: "", report: "" } });
    const [openModal, setOpenModal] = useState(false);
    const [currentReview, setCurrentReview] = useState({
        data: function () {
            return { id: "id", helpfulBy: [], likedBy: [], reportedBy: [] };
        },
    });

    useEffect(() => {
        if (!loading && user !== null) {
            // Load in everything!
            console.log("Loading in everything, signed in already");
            getData();
        }
    }, [id, loading]);

    const getData = async () => {
        const docRef = doc(db, "classes", `${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setClassData(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        const subCollectionRef = collection(db, `classes/${id}/reviews`);
        const collectionQuery = query(subCollectionRef, orderBy("helpfulCount", "desc"), limit(5));
        const querySnapshot = await getDocs(collectionQuery);
        let temp = [];
        let temporaryLikingData = {};
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            temp.push(doc);
        });
        setClassReviewData(temp);

        setLoadingData(false);
    };

    const thumb = {
        color: "transparent",
        width: "0",
        height: "0",
    };

    return (
        <>
            {loadingData ? (
                <Loading />
            ) : (
                <div className='classContainer'>
                    <Navbar />
                    <div className='title'>
                        <h1>{classData.name}</h1>
                        <div className='stars'>
                            <Rating
                                name='mainClassStars'
                                value={classData.sumOfStars / classData.reviewCt}
                                readOnly
                                precision={0.5}
                                size='large'
                                color='primary'
                                sx={{
                                    fontSize: "3.5em",
                                    opacity: "0.8",
                                }}
                            />
                        </div>
                    </div>
                    {classData.reviewCt > 0 ? (
                        <div className='classContent'>
                            <div className='leftSide'>
                                <h3>{classData.desc}</h3>
                                <div className='overall-rating-container'>
                                    <IndRating name='Stress Level' level={Math.round((classData.sumOfStress / classData.reviewCt) * 10) / 10} extra='/5' style={{ backgroundImage: "linearGradient(to left top, red,white" }}></IndRating>
                                    <IndRating name='Learning Level' level={Math.round((classData.sumOfLearning / classData.reviewCt) * 10) / 10} extra='/5'></IndRating>
                                    {/* Blame Ashwin for the terrible spelling */}
                                    <IndRating name='Difficulty' level={Math.round((classData.sumOfDiffulty / classData.reviewCt) * 10) / 10} extra='/5'></IndRating>
                                    <IndRating name='Time Commitment' level={Math.round(classData.sumOfTimeCommit / classData.reviewCt)} extra='min'></IndRating>
                                </div>
                            </div>
                            <div className='rightSide'>
                                <h1>Reviews</h1>
                                <div className='reviews'>
                                    {classReviewData.map((review, index) => {
                                        return <Review key={index} review={review} uid={user?.uid} classId={id} />;
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NoReview />
                    )}
                </div>
            )}
        </>
    );
};

export default Class;
//
{
    /*
  all the slider garbage
<div className='sliders'> 
  <h3>Stress Level</h3>
<Slider
    color='primary'
    valueLabelDisplay='on'
    readOnly
    step={0.25}
    value={classData.sumOfStress / classData.reviewCt}
    max={5}
    min={0}
    sx={{
        width: "35vw",
        height: "3vh",
        "& .MuiSlider-thumb": thumb,
    }}
/>
</div>

<div className='sliders'>
<h3>Learning Level</h3>
<Slider
    color='primary'
    valueLabelDisplay='on'
    readOnly
    step={0.25}
    value={classData.sumOfLearning / classData.reviewCt}
    max={5}
    min={0}
    sx={{
        width: "35vw",
        height: "3vh",
        "& .MuiSlider-thumb": thumb,
    }}
/>
</div>

<div className='sliders'>
<h3>Difficulty Level</h3>
<Slider
    color='primary'
    valueLabelDisplay='on'
    readOnly
    step={0.25}
    value={classData.sumOfStress / classData.reviewCt}
    max={5}
    min={0}
    sx={{
        width: "35vw",
        height: "3vh",
        "& .MuiSlider-thumb": thumb,
    }}
/>
</div>

<div className='sliders'>
<h3>Time Commitment</h3>
<Slider
    color='primary'
    valueLabelDisplay='on'
    readOnly
    step={15}
    value={classData.sumOfTimeCommit / classData.reviewCt}
    max={180}
    min={0}
    sx={{
        width: "35vw",
        height: "3vh",
        "& .MuiSlider-thumb": thumb,
    }}
    valueLabelFormat={(value) => <div>{value + " Min Per Day"}</div>}
/>
</div>
*/
}
