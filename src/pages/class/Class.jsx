import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, orderBy, query, collection, getDocs, limit, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import Loading from "../../components/loading/Loading";
import Navbar from "../../components/navbar/Navbar";
import IndRating from "./IndRating";
import NoReview from "./NoReview";
import Review from "./Review";

import "./class.css";

import Rating from "@mui/material/Rating";

import Chip from "@mui/material/Chip";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckIcon from "@mui/icons-material/Check";
import useAuthRedirect from "../../hooks/useAuthRedirect";
<<<<<<< HEAD
import classNames from "../../data/classNames2122.json";
=======
>>>>>>> 585779aeb569a5b0adeb4394cc3e27746462e343

const db = getFirestore();
const auth = getAuth();
const Class = () => {
    useAuthRedirect();
    let navigate = useNavigate();
    let { id } = useParams();
    const db = getFirestore();
    const [classData, setClassData] = useState({next: [], previous: []});
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

<<<<<<< HEAD
    const handleOpenModal = (doc) => {
        setOpenModal(true);
        // changed to now use the entire document, not just the data
        setCurrentReview(doc);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // const like = async (review) => {
    //     let object = reviewAttributes;
    //     console.log(review);

    //     let reviewRef = doc(db, "/classes/" + id + "/reviews", review.id);
    //     if (object[review.id].like === "outlined") {
    //         object[review.id].like = "filled";
    //         await updateDoc(reviewRef, {
    //             likedBy: arrayUnion(user.uid),
    //         });
    //     } else {
    //         object[review.id].like = "outlined";
    //         await updateDoc(reviewRef, {
    //             likedBy: arrayRemove(user.uid),
    //         });
    //     }
    //     setReviewAttributes({ ...object });
    // };
    // const helpful = async (review) => {
    //     let object = reviewAttributes;
    //     object[review.id].helpful = object[review.id].helpful === "outlined" ? "filled" : "outlined";
    //     setReviewAttributes({ ...object });
    // };
    // const report = async (review) => {
    //     let object = reviewAttributes;
    //     object[review.id].report = object[review.id].report === "outlined" ? "filled" : "outlined";
    //     setReviewAttributes({ ...object });
    // };

=======
>>>>>>> 585779aeb569a5b0adeb4394cc3e27746462e343
    useEffect(() => {
        if (!loading && user !== null){
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

<<<<<<< HEAD
    const ReviewModal = () => {
        return (
            <Modal open={openModal} onClose={handleCloseModal} className='modal' style={{ transitionDuration: 0 + "s" }}>
                <div className='modalContainer'>
                    <Box className='modalContent'>
                        <div className='modalLeft'>
                            <div className='modaltitle'>
                                <h2>{currentReview.data().author?.split(" ")[0]}'s Review</h2>
                                <Rating sx={{ fontSize: "1.25em" }} name='read-only' value={currentReview.data().rating} readOnly />
                            </div>
                            <h4>Based on {currentReview.data().year}</h4>

                            <h3>{currentReview.data().review}</h3>
                        </div>

                        <div className='modalRight'>
                            <div className='modalData'>
                                <h2>{currentReview.data().author?.split(" ")[0]}'s Ranking</h2>
                                <div className='ranking-in-modal'>
                                    <IndRating name='Stress Level' level={currentReview.data().stressLevel} extra='/5'></IndRating>
                                    <IndRating name='Learning Level' level={currentReview.data().learningLevel} extra='/5'></IndRating>
                                    {/* Blame Ashwin for the terrible spelling */}
                                    <IndRating name='Difficulty' level={currentReview.data().difficulty} extra='/5'></IndRating>
                                    <IndRating name='Time Commitment' level={currentReview.data().time} extra='min'></IndRating>
                                </div>
                                <div className='boxButtons'>

                                  
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </Modal>
        );
    };

    const Review = ({ review }) => {
        return (
            <>
                <Box className='box' onClick={() => handleOpenModal(review)}>
                    <div>
                        <h4>{review.data().review.substring(0, 200)}...</h4>
                    </div>
                    <div className='all-buttons-individual-rating'>
                        <Rating className='reviewStar' sx={{ fontSize: "1.75em" }} value={review.data().rating} readOnly />
                        <div className='boxButtons'>
                            {/* <Chip variant={reviewAttributes[review.id]?.like} title='Like' onClick={() => like(review)} label={review.data().likedBy.length} icon={<ThumbUpIcon />}></Chip>
                            <Chip variant={reviewAttributes[review.id]?.helpful} title='Helpful' onClick={() => helpful(review)} label={review.data().helpfulBy.length} icon={<CheckIcon />}></Chip>
                            <Chip variant={reviewAttributes[review.id]?.report} title='Inaccurate' onClick={() => report(review)} label={review.data().reportedBy.length} icon={<FlagIcon />}></Chip> */}
                        </div>
                    </div>
                </Box>
            </>
        );
=======
    const thumb = {
        color: "transparent",
        width: "0",
        height: "0",
>>>>>>> 585779aeb569a5b0adeb4394cc3e27746462e343
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
                        <div className='classContent'>
                            <div className='leftSide'>
                                <h3>{classData.desc}</h3>
                                {classData.reviewCt > 0 ?

                                <div className='overall-rating-container'>
                                    <IndRating name='Stress Level' level={Math.round((classData.sumOfStress / classData.reviewCt) * 10) / 10} extra='/5' style={{ backgroundImage: "linearGradient(to left top, red,white" }}></IndRating>
                                    <IndRating name='Learning Level' level={Math.round((classData.sumOfLearning / classData.reviewCt) * 10) / 10} extra='/5'></IndRating>
                                    {/* Blame Ashwin for the terrible spelling */}
                                    <IndRating name='Difficulty' level={Math.round((classData.sumOfDiffulty / classData.reviewCt) * 10) / 10} extra='/5'></IndRating>
                                    <IndRating name='Time Commitment' level={Math.round(classData.sumOfTimeCommit / classData.reviewCt)} extra='min'></IndRating>
                                </div>
                                :
                                <div className='overall-rating-container'>
                                    <IndRating name='Stress Level' level={"?"} extra='/5' style={{ backgroundImage: "linearGradient(to left top, red,white" }}></IndRating>
                                    <IndRating name='Learning Level' level={"?"} extra='/5'></IndRating>
                                    {/* Blame Ashwin for the terrible spelling */}
                                    <IndRating name='Difficulty' level={"?"} extra='/5'></IndRating>
                                    <IndRating name='Time Commitment' level={"?"} extra='min'></IndRating>
                                </div>
                                }
                                
                                <h1>Suggested Class Path</h1>
                                <h2>Previous</h2>
                                {
                                    classData.previous.map((className, index) => {
                                        return (
                                            <p key = {className} onClick = {()=>navigate("/class/" + className)}>
                                                {Object.keys(classNames).filter(key => classNames[key].code === className)[0]}
                                            </p>
                                        )
                                    })
                                }
                                <h2>Next</h2>
                                {
                                    classData.next.map((className, index) => {
                                        return (
                                            <p key = {className} onClick = {()=>navigate("/class/" + className)}>
                                                {Object.keys(classNames).filter(key => classNames[key].code === className)[0]}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            <div className='rightSide'>
<<<<<<< HEAD

                            {
                                classData.reviewCt > 0 ?
                                    <>
                                    <h1>Reviews</h1>
                                    <div className='reviews'>
                                        {classReviewData.map((review, index) => {
                                            return <Review key={index} review={review} />;
                                        })}
                                    </div>
                                    </>
                                : 
                                <NoReview />
                            }
=======
                                <h1>Reviews</h1>
                                <div className='reviews'>
                                    {classReviewData.map((review, index) => {
                                        return <Review key={index} review={review} uid={user?.uid} classId={id} />;
                                    })}
                                </div>
                                <br />
                                <Button
                                    variant='contained'
                                    size='large'
                                    onClick={() => {
                                        navigate("./path");
                                    }}>
                                    View Class Path For this Class
                                </Button>
>>>>>>> 585779aeb569a5b0adeb4394cc3e27746462e343
                            </div>

                            
                        </div>
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
