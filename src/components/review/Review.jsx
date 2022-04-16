
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { getFirestore, doc,updateDoc, arrayRemove, arrayUnion, writeBatch} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Review = ({ classData, classId, review, handleOpenModal, setAllClassReviewData, setYourReviews }) => {

    const db = getFirestore();
    const auth = getAuth();

    const [liked, setLiked] = useState(review.data().likedBy.includes(auth.currentUser.uid));
    const [reported, setReported] = useState(review.data().reportedBy.includes(auth.currentUser.uid));

    const [likeCount, setLikeCount] = useState(review.data().likes);
    const [reportCount, setReportCount] = useState(review.data().reports);

    const handleDelete = async(docId) => {
        const batch = writeBatch(db);
        const docRefReview = doc(db, "classes", classId, "reviews", docId);
        batch.delete(docRefReview);
        
        const docRefUser = doc(db, "users", auth.currentUser.uid);

        batch.update(docRefUser, {
            reviewedClasses: arrayRemove(classId)
        })

        const docRefClass = doc(db, "classes", classId);
        batch.update(docRefClass, {
            reviewCt: classData.reviewCt - 1,
            sumOfDiffulty: classData.sumOfDiffulty - review.data().difficulty,
            sumOfLearning: classData.sumOfLearning - review.data().learningLevel,
            sumOfStars: classData.sumOfStars - review.data().rating,
            sumOfStress: classData.sumOfStress - review.data().stressLevel,
            sumOfTimeCommitment: classData.sumOfTimeCommitment - review.data().time,
        })

        if(setAllClassReviewData !== undefined && setYourReviews !== undefined){
            setAllClassReviewData((review) => review.filter(review => review.id !== docId));
            setYourReviews((review) => review.filter(review => review.id !== docId));
        }

        await batch.commit();

    }

    const handleLike = async(docId) => {
        const docRefReview = doc(db, "classes", classId, "reviews", docId);

        if(liked){ //reverse magic
            setLikeCount(likeCount - 1);
            const tempLikes = review.data().likes > 0 ? review.data().likedBy.length - 1 : 0
            await updateDoc(docRefReview, {likedBy: arrayRemove(auth.currentUser.uid), likes: tempLikes});
        }
        else{
            setLikeCount(likeCount + 1);
            await updateDoc(docRefReview, {likedBy: arrayUnion(auth.currentUser.uid), likes: review.data().likedBy.length + 1});
        }

        setLiked(!liked);


    }
    const handleReport = async(docId) => {
        const docRefReview = doc(db, "classes", classId, "reviews", docId);

        if(reported){ //reverse magic
            setReportCount(reportCount - 1);
            const tempReports = review.data().reports > 0 ? review.data().reportedBy.length - 1 : 0
            await updateDoc(docRefReview, {reportedBy: arrayRemove(auth.currentUser.uid), reports: tempReports});
        }
        else{
            setReportCount(reportCount + 1);
            await updateDoc(docRefReview, {reportedBy: arrayUnion(auth.currentUser.uid), reports: review.data().reportedBy.length + 1});
        }

        setReported(!reported);

    }
    return (
        <>
            <Box className='box'>
                <div className = 'openClickPart' onClick={() => handleOpenModal(review)}>
                    <h4>{review.data().review.substring(0, 200)}...</h4>
                </div>
                {
                    review.data().reports
                    > 2 ? <p style = {{color: "red"}}>This review has been taken down due to a large number of reports. If you want to refute this decision please contact us!</p> : <br />
                }
                <div className='all-buttons-individual-rating'>
                    <Rating className='reviewStar' sx={{ fontSize: "1.75em" }} value={review.data().rating} readOnly />
                    <div className="action-button-group">
                        <span style = {{color: liked ? "var(--liked)" : "" }} onClick = {()=>handleLike(review.id)}>
                            <p>{likeCount}</p>
                            <ThumbUpRoundedIcon />
                        </span>
                        <span style = {{color: reported ? "var(--reported)" : "" }} onClick = {()=>handleReport(review.id)}>
                            <p>{reportCount}</p>
                            <FlagIcon />
                        </span>
                        {
                            (review.data().uid === auth.currentUser.uid) &&
                            <span className = "deleteButton" onClick = {()=>handleDelete(review.id)}>
                                <DeleteForeverIcon />
                            </span>
                        }
                    </div>
                </div>
            </Box>
        </>
    );
};

export default Review;