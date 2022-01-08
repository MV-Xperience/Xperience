const IndRating = (props) => {
    let linearGradient;
    if (props.extra === "min") {
        linearGradient = "linear-gradient(to top, var(--transparent-accent-color), " + (props.level / 120) * 100 + "%,var(--transparent-accent-color)," + (props.level / 120) * 100 + "%, var(--accent-background))";
    } else {
        linearGradient = "linear-gradient(to top, var(--transparent-accent-color), " + (props.level / 5) * 100 + "%,var(--transparent-accent-color)," + (props.level / 5) * 100 + "%, var(--accent-background))";
    }
    return (
        <div
            className='ind-rating-container'
            style={{
                background: linearGradient,
            }}>
            <h2>
                {props.level}

                <span>{props.extra}</span>
            </h2>
            <p>{props.name}</p>
        </div>
    );
};
export default IndRating;
