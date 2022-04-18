import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, orderBy, query, collection, getDocs, limit} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import Loading from "../../components/loading/Loading";
import Navbar from "../../components/navbar/Navbar";
import ReviewModal from "../../components/reviewModal/ReviewModal";
import Review from "../../components/review/Review";

import IndRating from "./IndRating";
import NoReview from "./NoReview";

import "./class.css";

import Rating from "@mui/material/Rating";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import classNames from "../../data/classNames2122.json";

const auth = getAuth();
const Class = () => {
    useAuthRedirect();
    let navigate = useNavigate();
    let { id } = useParams();
    const db = getFirestore();
    const [classData, setClassData] = useState({next: [], previous: []});
    const [loadingData, setLoadingData] = useState(true);
    const [user, loading] = useAuthState(auth);
    const [classReviewData, setClassReviewData] = useState({});


    const [openModal, setOpenModal] = useState(false);
    const [currentReview, setCurrentReview] = useState({
        data: function () {
            return { id: "id", helpfulBy: [], likedBy: [], reportedBy: [] };
        },
    });

    const handleOpenModal = (doc) => {
        setOpenModal(true);
        // changed to now use the entire document, not just the data
        setCurrentReview(doc);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };


   
    useEffect(() => {
        if (!loading && user !== null){
            // Load in everything!
            const getData = async () => {
                const docRef = doc(db, "classes", `${id}`);
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) {
                    setClassData(docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                }
        
                const subCollectionRef = collection(db, `classes/${id}/reviews`);
                const collectionQuery = query(subCollectionRef, orderBy("likes", "desc"), limit(5));
                const querySnapshot = await getDocs(collectionQuery);
                let temp = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    temp.push(doc);
                });
                temp = temp.filter((doc) => doc.data().reports < 3);
                setClassReviewData(temp);
        
                setLoadingData(false);
            };
            
            getData();
        }
    }, [id, loading, user, db]);
    
  

    return (
        <>
            {loadingData ? (
                <Loading />
            ) : (
                <>
                <ReviewModal currentReview={currentReview} handleCloseModal = {handleCloseModal} openModal = {openModal} />
                {/* This only works bc wyatts werid function ;) */}

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
                                    classData.previous !== undefined ?
                                    <>
                                        {
                                            classData.previous.map((className, index) => {
                                                return (
                                                    <p key = {className} onClick = {()=>navigate("/class/" + className)}>
                                                        {Object.keys(classNames).filter(key => classNames[key].code === className)[0]}
                                                    </p>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <p style = {{cursor: "text"}}>NONE</p>
                                }
                                <h2>Next</h2>
                                {
                                    classData.next !== undefined ?
                                    <>
                                    {
                                        classData.next.map((className, index) => {
                                            return (
                                                <p key = {className} onClick = {()=>navigate("/class/" + className)}>
                                                    {Object.keys(classNames).filter(key => classNames[key].code === className)[0]}
                                                </p>
                                            )
                                        })
                                    }
                                    </>
                                    :
                                    <p style = {{cursor: "text"}}>NONE</p>
                                }
                            </div>
                            <div className='rightSide'>

                            {
                                classData.reviewCt > 0 ?
                                    <>
                                    <h1>Recent Reviews</h1>
                                    <div className='reviews'>
                                        {classReviewData.map((review, index) => {
                                            return <Review key={index} review={review} handleOpenModal = {handleOpenModal}/>;
                                        })}
                                    </div>
                                    </>
                                : 
                                <NoReview />
                            }
                            </div>

                            
                        </div>
                </div>
                </>
            )}
        </>
    );
};

export default Class;
