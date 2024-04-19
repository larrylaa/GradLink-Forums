import './postcard.css';

const Postcards = () => {
    return (
        <>
            <div className="postcard-container">
                
                <div className="title"> 
                    <h2>What does the fox say?</h2> 
                </div>
                
                <div className="body">
                    <p>Guys! So I was in the shower last day and it just popped in my head. What does the fox say? Like really. How do they sound when they speak. I know about dogs, cats, mouse, cow, etc but fox! Never heard of it.</p>
                    <p>Anyways, if any of you guys have any idea. Let me know in the comments. Thanks in advance.</p>
                </div> 
                <hr></hr>

                <div className="username">
                    <span style={{ color: "grey" }}>Posted by </span>
                    <span style={{ color: "#425EF1" }}>Aakash Raj Dahal</span>
                </div>

                <div className="timestamp">12hr ago</div>
                <div className="comments">💬 50</div>
                
                <button style={{ color: "#9DBDE3" }}>&#9650;</button>
                <h10> 5 </h10>
                <button style={{ color: "#9DBDE3" }}>&#9660;</button>

            </div>
        </>
    );
};

export default Postcards;
