import './about.css';
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
const About = () => {

    const teamData = {
        "team": [
            {
                "name": "Ashwin Talwalkar",
                "role": "Project Lead",
                "job": "Full Stack Developer",
                "githubLink": "https://github.com/Ashwin-T/",
                "websiteLink": "https://ashwintalwalkar.com",
                "mailLink": "mailto:atalwalkar719@gmail.com",
            },
            {
                "name": "Wyatt Cowley",
                "role": "Project Contributor",
                "job": "Frontend Developer",
                "githubLink": "https://github.com/wycowley",
                "websiteLink": "https://wyattcowley.com",
                "mailLink": "mailto:wycowley@gmail.com",
            },
            {
                "name": "Zephyr Jones",
                "role": "Project Contributor",
                "job": "Backend Developer",
                "githubLink": "https://github.com/zphyrj/",
                "websiteLink": "https://zephyrj.com/",
                "mailLink": "mailto:contact@zephyrj.com"
            },
            {
                "name": "Sonav Agarwal",
                "role": "Designer",
                "job": "UI/UX Designer",
                "githubLink": "https://github.com/SonavAgarwal",
                "websiteLink": "https://sonavagarwal.com/",
                "mailLink": "mailto:me@sonavagarwal.com/",
            },
            {
                "name": "Lorenzo Varlaro",
                "role": "Designer",
                "job": "Logo Designer",
                "githubLink": "",
                "websiteLink": "https://www.youtube.com/channel/UCnRfqSAfQ9_Sx7cyRbkO3Rw",
                "mailLink": "mailto:lorenzo.varlaro@gmail.com",
            }
        ]      
    }
    return ( 
        <>
            <Navbar />
            <div className="about-container">
                    <br />
                    <h1>About MV Xperience</h1>
                    <br />

                <div className="content">
                    <div className="left">
                        <div>
                            <h2>Our Mission</h2>
                            <h4>Our goal is to help give students a better idea of the commitment level and course load that different classes and composite schedules bring.</h4>
                        </div>
                        <div>
                            <h2>What is MV Xperience and how does it help?</h2>
                            <h4>MV Xperience is a resource that provides MVHS students with reviews and advice from current and previous MVHS students, giving others a better idea of the commitment level and course load that different classes bring. Our data is based off real student experience.</h4>
                        </div>
                    </div>
                    
                    <div className="right">
                        <div>
                            <h2>How does MV Xperience work?</h2>
                            <h4>MV Xperience offers a platform for you to ask questions as well as view or leave reviews of classes in order for other students and yourself to get a better understanding of what classes are expecting at MVHS.</h4>
                        </div>
                    </div>
                </div>

                <span>
                    <h2>Meet the Team</h2>
                </span>

                <div className="team">
                    <div className="card-container">
                        {teamData.team.map((member, index) => {
                            return (
                                <Card 
                                    key={index}
                                    {...member}
                                />
                                )
                            })
                        }
                    </div>
                    <br />
                    <p>A special thanks to Josie Penix for helping spark the idea!</p>
                </div>
                <br />
            </div>
        </>
     );
}
 
export default About;