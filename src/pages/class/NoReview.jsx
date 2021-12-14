import {Link} from 'react-router-dom';

const NoReview = ()=>{
    return(
      <>
        <div className="noReviewContainer">
            <h1>No Reviews Yet!</h1>
            <Link to = '/review'><h3>Click here to make a new review</h3></Link>
        </div>
      </>
    )
}

export default NoReview;