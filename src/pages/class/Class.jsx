import {useParams} from 'react-router-dom';
import {getFirestore, doc, getDoc, orderBy, query, collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from 'react';

import Loading from "../../components/loading/Loading";
import Navbar from "../../components/navbar/Navbar";

import NoReview from './NoReview';

import './class.css';

import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const Class = () => {

    let {id} = useParams();
    const db = getFirestore();

    const [classData, setClassData] = useState({})
    const [loading, setLoading] = useState(false)

    const [classReviewData, setClassReviewData] = useState({})

    const [openModal, setOpenModal] = useState(false);
    const [currentReview, setCurrentReview] = useState({});

    const handleOpenModal = (doc) => {
        setOpenModal(true);
        setCurrentReview(doc.data())
        console.log(openModal);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
        console.log(openModal);
    }


    useEffect(() => {

        const getData = async () => {
          setLoading(true);  

          const docRef = doc(db, 'classes', `${id}`);
          const docSnap = await getDoc(docRef);


          if (docSnap.exists()) {
            setClassData(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          
          const subCollectionRef = collection(db, `classes/${id}/reviews`);
          const collectionQuery= query(subCollectionRef, orderBy("helpfulCount", "desc"));
          const querySnapshot = await getDocs(collectionQuery)
          let temp = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            temp.push(doc)
          });

          setClassReviewData(temp)

          setLoading(false);

        }

        getData();


    },[db, id])



    const thumb = {
        color: 'primary',
        width: '4vh',
        height: '4vh',
    }

    const Review = ({review}) => {

      return ( 
          <> 
              <Box className = 'box' onClick = {()=>handleOpenModal(review)}>
                  <h4>{review.data().review}</h4>
                  <div className = 'boxButtons'>
                      <Rating name="read-only" value={review.data().rating} readOnly />
                      <button>🤝 {review.data().helpfulCount}</button>
                  </div>
              </Box> 
          </>
       );
  }

    return ( 
        <>

      


            {loading ? <Loading /> : 

              <div className= "classContainer">

              <Modal
              open={openModal}
              onClose={handleCloseModal}
              >
              <div className='modalContainer'>
                 <Box className = 'modalContent' >
                  <h4>{currentReview.review}</h4>
                  <div className = 'boxButtons'>
                      <Rating name="read-only" value={currentReview.rating} readOnly />
                  </div>
                </Box>
              </div>
            </Modal>

            <Navbar />
                <div className= "title">
                  <h1>{classData.name}</h1>                
                  <div className= "stars">
                    <Rating 
                    
                    name="mainClassStars"
                    
                    value={classData.sumOfStars / classData.reviewCt}
                    readOnly
                    precision={0.5}

                    size = 'large'
                    color = "primary"

                    sx = {{
                      fontSize: '3.5em',
                    }}
                    
                    />
                  </div>
                </div>
                {classData.reviewCt > 0 ?
                <div className="classContent">
                  <div className= "leftSide">
                    <h3>
                      {classData.desc}
                    </h3>

                    <div className= "sliders">
                      <h3>Stress Level</h3>
                      <Slider color= "primary" valueLabelDisplay="on" readOnly step={0.25} value = {classData.sumOfStress/classData.reviewCt} max = {5} min = {0} sx = {{width: '35vw',height: '3vh', '& .MuiSlider-thumb': thumb}}/>
                    </div>
        
                    <div className= "sliders">
                      <h3>Difficulty Level</h3>
                      <Slider color= "primary" valueLabelDisplay="on" readOnly step={0.25} value = {classData.sumOfStress/classData.reviewCt} max = {5} min = {0} sx = {{width: '35vw',height: '3vh', '& .MuiSlider-thumb': thumb}}/>
                    </div>
                    
                    <div className= "sliders">
                      <h3>Time Commitment</h3>
                      <Slider color= "primary" valueLabelDisplay="on" readOnly step={15} value = {classData.sumOfTimeCommit/classData.reviewCt} max = {180} min = {0} sx = {{width: '35vw',height: '3vh', '& .MuiSlider-thumb': thumb}} valueLabelFormat={value => <div>{value + " Min Per Day"}</div>}/>
                    </div>
                  </div>

                  <div className="rightSide">
                    <h1>Reviews</h1>
                    {classReviewData.map((review, index) => {
                      return (
                        <Review key={index} review={review}/>
                      )
                    })}
                  </div>
                </div> : <NoReview />}
              </div> 
              
          
            }
        </> 
    );
}
 
export default Class;