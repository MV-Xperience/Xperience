import CircularProgress from "@mui/material/CircularProgress";
import './loading.css'
const Loading = ({size}) => {

    if(size === undefined){
        size = 25;
    }
    const sizeLocal = size;

    return ( 
    <div className = 'loader'>
        <CircularProgress size = {sizeLocal} color='primary' />
    </div> 
    )
    ;
}
 
export default Loading;