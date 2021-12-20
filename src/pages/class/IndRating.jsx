const IndRating = (props) => {
    return (
        <div className='ind-rating-container'>
            <h2>
                {props.level}

                <span>{props.extra}</span>
            </h2>
            <p>{props.name}</p>
        </div>
    );
};
export default IndRating;
