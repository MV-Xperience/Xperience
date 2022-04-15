
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IndRating from "../../pages/class/IndRating";

 
const ReviewModal = ({currentReview, handleCloseModal, openModal}) => {
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
export default ReviewModal;