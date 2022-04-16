import "./browse.css";
import {useState } from "react";
import { getFirestore, doc, getDoc, orderBy, query, collection, getDocs} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import Navbar from "../../components/navbar/Navbar";

import Button from "@mui/material/Button";


import ReviewModal from '../../components/reviewModal/ReviewModal';
import Review from "../../components/review/Review";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import classNames from "../../data/classNames2122.json";
import NoReview from "../../pages/class/NoReview";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Browse = () => {

    useAuthRedirect();

    const [classData, setClassData] = useState({});
    const [allClassReviewData, setAllClassReviewData] = useState([]);
    const [yourReviews, setYourReviews] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const db = getFirestore();
    const auth = getAuth();
    const [classInput, setClassInput] = useState("");
    const [searched, setSearched] = useState(false);
    const [classId, setClassId] = useState("");

    const [loading, setLoading] = useState(false);

    const getData = async() => {
            setLoading(true);
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
                setClassData(null);

            }

            const subCollectionRef = collection(db, `classes/${classId}/reviews`);
            const collectionQuery = query(subCollectionRef, orderBy("likes", "desc"));
            const querySnapshot = await getDocs(collectionQuery);
            let temp = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                temp.push(doc);
                
            });
            
            let tempCopy = temp.filter((review) => review.data().reports < 3);
            setAllClassReviewData(tempCopy);

            temp = temp.filter((review) => review.data().uid === auth.currentUser.uid);
            setYourReviews(temp);
            setLoading(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal = (doc) => {
        setOpenModal(true);
        // changed to now use the entire document, not just the data
        setCurrentReview(doc);
    };
    const [currentReview, setCurrentReview] = useState(null);

    const [toggleYours, setToggleYours] = useState(false);


    return (
        <>
            {
                searched && currentReview !== null && <ReviewModal classId = {classId} currentReview={currentReview} handleCloseModal = {handleCloseModal} openModal = {openModal} />
            }
            <Navbar />
            <div className="browse-page">
                <div className="content">
                    <div className='mainText'>
                        <h1 className='pageHeading'>Look For Reviews</h1>
                        {
                            searched && 
                            <span>
                                <label htmlFor="toggleYourOwn">{!toggleYours ? "Viewing All": "Viewing Your Own"}</label>
                                <input type="checkbox" onChange = {(e)=> setToggleYours(!toggleYours)} id="toggleYourOwn" name="toggleYourOwn" />
                            </span>
                        }
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
                        loading ? <Loading size = {100}/> :
                        
                        <>
                        {
                            searched ? 
                            <>
                            { 
                                yourReviews.length > 0 || allClassReviewData.length > 0?
                                <>
                                    <h1>Reviews</h1>
                                    <div className=''>
                                        {
                                            toggleYours ? 
                                            <>
                                                {yourReviews.map((review, index) => {
                                                    return <Review key={review.id} classData = {classData} setAllClassReviewData = {setAllClassReviewData} setYourReviews = {setYourReviews} handleOpenModal = {handleOpenModal} classId = {classId} review={review} />;
                                                })}
                                                {
                                                    yourReviews.length === 0 && <NoReview />
                                                }
                                            </>
                                            :
                                            <>
                                                {allClassReviewData.map((review, index) => {
                                                    return <Review key={review.id} classData = {classData} setAllClassReviewData = {setAllClassReviewData} setYourReviews = {setYourReviews} handleOpenModal = {handleOpenModal} classId = {classId} review={review} />;
                                                })}
                                                {
                                                    allClassReviewData.length === 0 && <NoReview />
                                                }
                                            </>
                                        }
                                    </div>
                                </>
                                : 
                                <NoReview />
                                }
                            </>
                            :<></>
                        }
                        </>
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