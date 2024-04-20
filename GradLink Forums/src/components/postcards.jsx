import './postcard.css';

const Postcards = () => {
    return (
        <div className="postcard-container">

            <div className="title">What does the fox say?</div>

            <div className="vote-buttons">
                <button className="vote-button">&#9650;</button>
                <h10 className="votes"> 5</h10>
                <button className="vote-button">&#9660;</button>
            </div>
            
            <div className="body">
                <p> Guys! So I was in the shower last day and it just popped in my head. What does the fox say? Like really. How do they sound when they speak. I know about dogs, cats, mouse, cow, etc but fox! Never heard of it.</p>
            </div> 

            <hr className="line"></hr>

            <div className="user-info">
                <div className="username">Posted by <span style={{ color: "#425EF1" }}>Larry La</span></div>
                <div className="timestamp">12hr ago</div>
            </div>
            
            <div className="comments">💬 50</div>
            
        </div>
    );
};

export default Postcards;
