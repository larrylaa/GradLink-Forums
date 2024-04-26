import React, { useState } from 'react';
import './postcard.css';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ebzpmahaxdoslkyvfcmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVienBtYWhheGRvc2xreXZmY21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDk1OTEsImV4cCI6MjAyOTQyNTU5MX0.jtcncTjMAsK5RtGmIH455hFd-gLPLmrrlIxLU1y9EtU'; 
const supabase = createClient(supabaseUrl, supabaseKey);


const Postcards = (props) => {
    const [votes, setVotes] = useState(props.votes);

    const handleUpvote = async () => {
        const {error } = await supabase
            .from('Posts')
            .update({ votes: votes + 1})
            .eq('title', props.title)

        if (error) {
            console.error('Error incrementing vote count:', error.message);
        } else {
            setVotes(votes + 1);
        }
    };

    const handleDownvote = async () => {
        const {error } = await supabase
            .from('Posts')
            .update({ votes: votes - 1 })
            .eq('title', props.title)

        if (error) {
            console.error('Error decrementing vote count:', error.message);
        } else {
            setVotes(votes - 1);
        }
    };

    return (
            <div className="postcard-container">

                <a href={`/${props.title}`}>
                <div className="title"> {props.title}</div>
                </a>

                <div className="vote-buttons">
                    <button className="vote-button" onClick={handleUpvote}>&#9650;</button>
                    <h5 className="votes"> {votes} </h5>
                    <button className="vote-button" onClick={handleDownvote}>&#9660;</button>
                </div>

                <div className="body">
                    <p> {props.body} </p>
                </div> 

                <hr className="line"></hr>

                <div className="user-info">
                    <div className="username">Posted by <span style={{ color: "#425EF1" }}> {props.user} </span></div>
                    <div className="timestamp"> {props.timestamp}</div>
                </div>

                <div className="comments">💬 {props.comments}</div>

            </div>
    );
};

export default Postcards;
