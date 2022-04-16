import {Link} from 'react-router-dom';

const NotFound = () => {
    return ( 
        <>
            <div className = 'notFound'>
                <h1>404</h1>
                <h2>Page not found</h2>
                <Link to = "/">Click here to go back!</Link>
            </div>
            
        </>
     );
}
 
export default NotFound;