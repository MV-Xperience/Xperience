import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'

const Review = ({review}) => {
    
    const navigate = useNavigate();
    return ( 
        <>
            <Box className = 'box' onClick = {()=> navigate(`/review/${review.id}`)}>
                <h4>{review.data().review}</h4>
                <div className = 'boxButtons'>
                    <Rating name="read-only" value={review.data().rating} readOnly />
                    <button>🤝 {review.data().helpfulCount}</button>
                </div>
            </Box> 
        </>
     );
}

 
export default Review;