import './postcard.css';

const Postcards = (props) => {
    return (
        <div className="postcard-container">

            <div className="title"> {props.title} What does the fox say?</div>

            <div className="vote-buttons">
                <button className="vote-button">&#9650;</button>
                <h10 className="votes"> {props.votes }5 </h10>
                <button className="vote-button">&#9660;</button>
            </div>
            
            <div className="body">
                <p> {props.body} Guys! So I was in the shower last day and it just popped in my head. What does the fox say? Like really. How do they sound when they speak. I know about dogs, cats, mouse, cow, etc but fox! Never heard of it.</p>
            </div> 

            <hr className="line"></hr>

            <div className="user-info">
                <div className="username">Posted by <span style={{ color: "#425EF1" }}> {[]}Larry La {props.user} </span></div>
                <div className="timestamp"> {props.timestamp} 12hr ago</div>
            </div>
            
            <div className="comments">💬 {props.comments}50</div>
            
        </div>
    );
};

export default Postcards;
