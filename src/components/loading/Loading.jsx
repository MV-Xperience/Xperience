import CircularProgress from "@mui/material/CircularProgress";
import './loading.css'
const Loading = () => {
    return ( 
    <div className = 'loader'>
        <CircularProgress color='primary' />
    </div> 
    )
    ;
}
 
export default Loading;