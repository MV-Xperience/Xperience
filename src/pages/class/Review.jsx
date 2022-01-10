import { getFirestore, doc, getDoc, orderBy, query, collection, getDocs, limit, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckIcon from "@mui/icons-material/Check";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";

import IndRating from "./IndRating";

import { useState, useEffect } from "react";
import { ReviewsTwoTone } from "@mui/icons-material";

const db = getFirestore();

const Review = ({ review, uid }) => {
    let { id } = useParams();

    const [numLikes, setNumLikes] = useState(review.data().likedBy.length);
    const [numHelpful, setNumHelpful] = useState(review.data().helpfulBy.length);
    const [numReport, setNumReport] = useState(review.data().reportedBy.length);

    const [inputLiked, setInputLiked] = useState();
    const [inputHelpful, setInputHelpful] = useState();
    const [inputReported, setInputReported] = useState();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setInputLiked(review.data().likedBy.includes(uid));
        setInputHelpful(review.data().helpfulBy.includes(uid));
        setInputReported(review.data().reportedBy.includes(uid));
        console.log("uid", uid);
    }, [uid]);

    const like = async () => {
        // all on client side
        let reviewRef = doc(db, "/classes/" + id + "/reviews", review.id);
        setInputLiked(!inputLiked);

        if (inputLiked) {
            setNumLikes(numLikes - 1);
            await updateDoc(reviewRef, { likedBy: arrayRemove(uid) });
        } else {
            setNumLikes(numLikes + 1);
            await updateDoc(reviewRef, { likedBy: arrayUnion(uid) });
        }
    };
    const helpful = async () => {
        let reviewRef = doc(db, "/classes/" + id + "/reviews", review.id);
        setInputHelpful(!inputHelpful);

        if (inputHelpful) {
            setNumHelpful(numHelpful - 1);
            await updateDoc(reviewRef, { helpfulBy: arrayRemove(uid) });
        } else {
            setNumHelpful(numHelpful + 1);
            await updateDoc(reviewRef, { helpfulBy: arrayUnion(uid) });
        }
    };
    const report = async () => {
        let reviewRef = doc(db, "/classes/" + id + "/reviews", review.id);
        setInputReported(!inputReported);

        if (inputReported) {
            setNumReport(numReport - 1);
            await updateDoc(reviewRef, { reportedBy: arrayRemove(uid) });
        } else {
            setNumReport(numReport + 1);
            await updateDoc(reviewRef, { reportedBy: arrayUnion(uid) });
        }
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleClick = () => {
        if (!openModal) {
            setOpenModal(true);
        }
    };
    const ReviewModal = () => {
        return (
            <Modal open={openModal} onClose={handleCloseModal} className='modal' style={{ transitionDuration: 0 + "s" }}>
                <div className='modalContainer'>
                    <Box className='modalContent'>
                        <div className='modalLeft'>
                            <div className='modaltitle'>
                                <h2>{review.data().author?.split(" ")[0]}'s Review</h2>
                                <Rating sx={{ fontSize: "1.25em" }} name='read-only' value={review.data().rating} readOnly />
                            </div>
                            <h4>Based on {review.data().year}</h4>

                            <h3>{review.data().review}</h3>
                        </div>

                        <div className='modalRight'>
                            <div className='modalData'>
                                <h2>{review.data().author?.split(" ")[0]}'s Ranking</h2>
                                <div className='ranking-in-modal'>
                                    <IndRating name='Stress Level' level={review.data().stressLevel} extra='/5'></IndRating>
                                    <IndRating name='Learning Level' level={review.data().learningLevel} extra='/5'></IndRating>
                                    {/* Blame Ashwin for the terrible spelling */}
                                    <IndRating name='Difficulty' level={review.data().difficulty} extra='/5'></IndRating>
                                    <IndRating name='Time Commitment' level={review.data().time} extra='min'></IndRating>
                                </div>
                                <div className='boxButtons'>
                                    <Chip variant={inputLiked ? "filled" : "outlined"} title='Like' onClick={() => like()} label={numLikes} icon={<ThumbUpIcon />}></Chip>
                                    <Chip variant={inputHelpful ? "filled" : "outlined"} title='Helpful' onClick={() => helpful()} label={numHelpful} icon={<CheckIcon />}></Chip>
                                    <Chip variant={inputReported ? "filled" : "outlined"} title='Inaccurate' onClick={() => report()} label={numReport} icon={<FlagIcon />}></Chip>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </Modal>
        );
    };

    return (
        <>
            <Box className='box' onClick={handleClick}>
                <ReviewModal></ReviewModal>
                <div>
                    <h4>{review.data().review.substring(0, 200)}...</h4>
                </div>
                <div className='all-buttons-individual-rating'>
                    <Rating className='reviewStar' sx={{ fontSize: "1.75em" }} value={review.data().rating} readOnly />
                    <div className='boxButtons'>
                        <Chip variant={inputLiked ? "filled" : "outlined"} title='Like' onClick={() => like()} label={numLikes} icon={<ThumbUpIcon />}></Chip>
                        <Chip variant={inputHelpful ? "filled" : "outlined"} title='Helpful' onClick={() => helpful()} label={numHelpful} icon={<CheckIcon />}></Chip>
                        <Chip variant={inputReported ? "filled" : "outlined"} title='Inaccurate' onClick={() => report()} label={numReport} icon={<FlagIcon />}></Chip>
                    </div>
                </div>
            </Box>
        </>
    );
};
export default Review;
