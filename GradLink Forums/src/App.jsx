import './App.css'
import { useState, useEffect } from 'react';
import { useParams, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from './components/navbar';
import Postcards from './components/postcards';
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

  useEffect(() => {
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

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <>
          <Navbar></Navbar>
          <br></br>
          <br></br>
          <br></br>

          {posts.map(post => (
            <Postcards
              key={post.id} 
              title={post.title}
              votes={post.votes}
              body={post.body}
              user={post.user}
              timestamp={formatTimestamp(post.timestamp)}
              comments={post.comments}
            />
          ))}
          </>
        )} />

        <Route path="/post/:id" element={(
          <>
          </>
        )} />

      </Routes>
    </div>
  );
}

export default App;
