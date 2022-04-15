import "./browse.css";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, orderBy, query, collection, getDocs, limit} from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";
import IndRating from "../class/IndRating";

import Rating from "@mui/material/Rating";


import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckIcon from "@mui/icons-material/Check";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import classNames from "../../data/classNames2122.json";
import NoReview from "../../pages/class/NoReview";
import { Link } from "react-router-dom";
const Browse = () => {
    useAuthRedirect();
    const [classData, setClassData] = useState({});
    const [classReviewData, setClassReviewData] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const db = getFirestore();
    const [classInput, setClassInput] = useState("");
    const [searched, setSearched] = useState(false);
    const [classId, setClassId] = useState("");
    useEffect(() => {
       
    }, []);

    const getData = async () => {
        
            const classId = classNames[classInput]?.code;

            if (!classId){
                alert("Your class name, " + classInput + " is not in our list of classes. Please choose a class in the dropdown.");
                return;
            }
            setSearched(true);
            setClassId(classId);
            const docRef = doc(db, "classes", classId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setClassData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            const subCollectionRef = collection(db, `classes/${classId}/reviews`);
            const collectionQuery = query(subCollectionRef, orderBy("helpfulCount", "desc"));
            const querySnapshot = await getDocs(collectionQuery);
            let temp = [];
            let temporaryLikingData = {};
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                temp.push(doc);
                
            });
            setClassReviewData(temp);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal = (doc) => {
        setOpenModal(true);
        // changed to now use the entire document, not just the data
        setCurrentReview(doc);
    };
    const [currentReview, setCurrentReview] = useState({
        data: function () {
            return { id: "id", helpfulBy: [], likedBy: [], reportedBy: [] };
        },
    });
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
    };

    return (
        <>
            <ReviewModal />

            <Navbar />
            <div className="browse-page">
                <div className="content">
                    <div className='mainText' >
                        <h1 className='pageHeading'>Look For Reviews</h1>
                    </div>
                    <datalist id='classes'>
                        {Object.keys(classNames).map((className, index) => {
                            return <option key={index} value={className}></option>;
                        })}
                    </datalist>
                    <div className="form-browse">
                        <input type='text' required value={classInput} list='classes' onChange={(e) => setClassInput(e.target.value)} placeholder='Search for a class you want to view...' />
                        <Button onClick = {getData} variant='contained' size='large'>Search</Button>
                    </div>
                    <br />
                   {
                       searched ? 
                          <>
                          { 
                          classData?.reviewCt > 0?
                            <>
                                <h1>Reviews</h1>
                                <div className=''>
                                    {classReviewData.map((review, index) => {
                                        return <Review key={index} review={review} />;
                                    })}
                                </div>
                            </>
                            : 
                            <NoReview />
                            }
                        </>
                        :<></>
                   }
                  {
                        searched &&
                        <div className = "askMoreLeft">
                            <h2>
                                Want to details and statistics on class data?{" "}
                                <Link to={'/class/' + classId} style={{ marginLeft: 0.25 + "rem" }}>
                                    <Button variant='contained'>View them here</Button>
                                </Link>
                            </h2>
                        </div>
                  }
                   <div className = "askMore">
                        <h2>
                            Want to review more classes?{" "}
                            <Link to='/review' style={{ marginLeft: 0.25 + "rem" }}>
                                <Button variant='contained'>Review them here</Button>
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Browse;