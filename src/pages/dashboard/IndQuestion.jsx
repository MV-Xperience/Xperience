import { useEffect } from "react";
import { Link } from "react-router-dom";
const IndQuestion = (params) => {
    useEffect(() => {
        console.log(params.data);
    }, [params]);
    return (
        <div className='individual-question-div'>
            <h2>{params.data.text}</h2>
            <br />
            <Link to={"/question/" + params.id} className='question-link'>
                View Replies
            </Link>
        </div>
    );
};
export default IndQuestion;
