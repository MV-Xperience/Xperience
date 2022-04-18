import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import './card.css';
const Card = ({name, profPic, role, job, githubLink, websiteLink, mailLink}) => {
    return ( 
        <>
            <div className="card">
                <div className="card-body">
                        <h3>{name}</h3>
                        <h4>{role}</h4>
                    <h4>{job}</h4>
                    <div className="links">
                        {
                            githubLink ? <a href={githubLink} target="_blank" rel="noopener noreferrer"><GitHubIcon /></a> : null
                        }
                        {
                            websiteLink ? <a href={websiteLink} target="_blank" rel="noopener noreferrer"><LanguageIcon /></a> : null
                        }
                        {
                            mailLink ? <a href={mailLink} target="_blank" rel="noopener noreferrer"><EmailIcon /></a> : null
                        }
                    </div>                
                </div>
            </div>

        </>
     );
}
 
export default Card;