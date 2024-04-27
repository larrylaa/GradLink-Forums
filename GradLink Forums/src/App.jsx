import './App.css'
import { useState, useEffect } from 'react';
import { useParams, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from './components/navbar';
import Postcards from './components/postcards';
import PostPage from './components/post'; 

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ebzpmahaxdoslkyvfcmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVienBtYWhheGRvc2xreXZmY21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDk1OTEsImV4cCI6MjAyOTQyNTU5MX0.jtcncTjMAsK5RtGmIH455hFd-gLPLmrrlIxLU1y9EtU'; 
const supabase = createClient(supabaseUrl, supabaseKey);

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 

  return `${year}/${month}/${day} ${hours}:${minutes} ${ampm}`;
}

function App() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postAuthor, setPostAuthor] = useState('');
  const [postImageLink, setPostImageLink] = useState('');
  const [isDescending, setIsDescending] = useState(true); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.from('Posts').insert([
        { title: postTitle, body: postBody, user: postAuthor,  img: postImageLink, comments: 0, votes: 0}
      ]);

      if (error) {
        console.error('Error creating post:', error.message);
        return;
      }

      fetchPosts();
      
      closeModal();

    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('Posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error.message);
        return;
      }

      setPosts(data);

    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const toggleSortOrder = () => {
    setIsDescending(prevState => !prevState); 
    const sortedPosts = [...posts].sort((a, b) => {
      return isDescending ? b.votes - a.votes : a.votes - b.votes;
    });
    setPosts(sortedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <>
            <Navbar posts={posts} />
            <br />
            <br />
            <br />

            <button className="blue-button" onClick={toggleSortOrder}>
              {"Filter (Upvotes)"}
            </button>
            <div></div>
            <br></br>

            <button className="blue-button" onClick={openModal}>Create Post</button>
            <br></br>
            <br></br>

            {posts.map(post => (
              <Postcards
                key={post.id}
                id={post.id}
                title={post.title}
                votes={post.votes}
                body={post.body}
                user={post.user}
                timestamp={formatTimestamp(post.timestamp)}
                comments={post.comments}
              />
            ))}

            {/* Modal form */}
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h2>Create a Post</h2>
                  <input type="text" placeholder="Title" value={postTitle} onChange={e => setPostTitle(e.target.value)} className="modal-input" />
                  <textarea placeholder="Body" value={postBody} onChange={e => setPostBody(e.target.value)} className="modal-input" />
                  <input type="text" placeholder="Author" value={postAuthor} onChange={e => setPostAuthor(e.target.value)} className="modal-input" />
                  <input type="text" placeholder="Image Link" value={postImageLink} onChange={e => setPostImageLink(e.target.value)} className="modal-input" />
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            )}
          </>
        )} />

      <Route path="/post/:title" element={ 
        <>
      <Navbar></Navbar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <PostPage posts={posts} />
        </>
    
    } 
      
      />


      </Routes>
    </div>
  );
}

export default App;
