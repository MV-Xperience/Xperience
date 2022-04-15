
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
const Review = ({ review, handleOpenModal }) => {

    const [liked, setLiked] = useState(false);
    const [helpful, setHelpful] = useState(false);
    const [reported, setReported] = useState(false);

    const handleLike = async (review) => {

    }

    const handleHelpful = async (review) => {

    }

    const handleReport = async (review) => {
    
    }
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

export default Review;