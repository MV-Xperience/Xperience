import './classpath.css'; 
import ClassNode from './ClassNode.jsx';
import * as classData from '../../data/classNames2122.json';
import Button from "@mui/material/Button";
import Navbar from '../../components/navbar/Navbar.jsx';
import { useNavigate, useParams } from "react-router-dom";
const ClassPath = () => {

    const {id} = useParams()

    let navigate = useNavigate();

    return ( 
        <>
            <div className="classPathContainer">
                <Navbar />
                <div className='title'>
                    <h1>AP Computer Science</h1>
                </div>
                <div className="classPath">
                    <div className="previous">
                        <ClassNode text={'1'} />
                        <ClassNode text={'2'} />
                    </div>
                    <div className="current">
                        <ClassNode text={id} />
                    </div>
                    <div className="next">
                        <ClassNode text={'4'} />
                    </div>
                </div>
                <div className="backButtonContainer">
                    <Button variant='contained' size='large' onClick = {()=> {navigate('../')}}>Go Back to Class Page</Button>
                </div>
            </div>
        </>

     );
}
 
export default ClassPath;