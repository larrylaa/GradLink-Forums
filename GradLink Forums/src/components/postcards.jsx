import './postcard.css';

const Postcards = (props) => {
    return (
        <a href={`/${props.id}`}>
        <div className="postcard-container">

            <div className="title"> {props.title}</div>

            <div className="vote-buttons">
                <button className="vote-button">&#9650;</button>
                <h5 className="votes"> {props.votes} </h5>
                <button className="vote-button">&#9660;</button>
            </div>
            
            <div className="body">
                <p> {props.body} </p>
            </div> 

            <hr className="line"></hr>

            <div className="user-info">
                <div className="username">Posted by <span style={{ color: "#425EF1" }}> {[]}{props.user} </span></div>
                <div className="timestamp"> {props.timestamp}</div>
            </div>
            
            <div className="comments">💬 {props.comments}</div>
            
        </div>
        </a>
    );
};

export default Postcards;
