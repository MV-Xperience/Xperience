import './about.css';
import Navbar from "../../components/navbar/Navbar";

const About = () => {
    return ( 
        <>
            <Navbar />
            <div className="about-container">
                <div className="content">
                    <h1>About MV Xperience</h1>
                    <h2>What is MV Xperience?</h2>
                    <h4>MV Xperience is a resource that provides MVHS students with reviews and advice from real current and previous MVHS students, giving students a better idea of the commitment level and course load of different classes and composite schedules based off real student experience.</h4>
                    <h2>How does MV Xperience work?</h2>
                    <h4>MV Xperience offers a platform for you to ask questions as well as view or leave reviews of classes in order for other students and yoruself to get a better understanding of what classes are expecting at MVHS.</h4>
                    {/* <h2>Does MV Xperiece have a Terms of Agreement?</h2>
                    <h4>YES! Please read it carefully. We understand not wanting to read it, but if you decide to, it will be very helpful to understand what is allowed and whats not!</h4>
                    <a href = 'https://ashwintalwalkar.com' rel="noreferrer" target = "_blank">Link to Terms of Agreement</a> */}
                    <h2>Who Created MV Xperience?</h2>
                    <h3>Project Lead and Manager: Ashwin Talwalkar</h3>
                    <h4>- Major Contributors: Ashwin Talwalkar & Wyatt Cowley</h4>
                    <h4>- Contributors and Design Specialists: Zephyr Jones, Lorenzo Varlaro, & Sonav Agarwal</h4>
                    <p>- A Special Thanks to Josie Penix for helping me come up with the idea!</p>
                </div>
            </div>
        </>
     );
}
 
export default About;