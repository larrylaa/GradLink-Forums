import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import "./post.css";

const supabaseUrl = 'https://ebzpmahaxdoslkyvfcmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVienBtYWhheGRvc2xreXZmY21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDk1OTEsImV4cCI6MjAyOTQyNTU5MX0.jtcncTjMAsK5RtGmIH455hFd-gLPLmrrlIxLU1y9EtU'; 
const supabase = createClient(supabaseUrl, supabaseKey);

function PostPage({ posts }) {
  const { title } = useParams();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');
  const [updatedLink, setUpdatedLink] = useState('');
  const [newComment, setNewComment] = useState(''); // New state for the new comment input

  const post = posts.find((post) => post.title === title);

  if (!post) {
    return <div>Post not found</div>;
  }

  let userCommentsArray = [];
  if (post.usercomments && typeof post.usercomments === 'object') {
    userCommentsArray = Object.values(post.usercomments);
  }
  console.log(userCommentsArray);

  const calculateTimeAgo = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const timeDifference = currentTime - postTime;

    if (timeDifference < 0) {
      return 'Future date';
    }

    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo > 0) {
      return daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
    } else {
      return hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`;
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('Posts').delete().eq('id', post.id);

      if (error) {
        throw error;
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase.from('Posts').update({
        title: updatedTitle,
        body: updatedBody,
        img: updatedLink,
      }).eq('id', post.id);

      if (error) {
        throw error;
      }

      console.log('Post updated:', data);
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  const handlePostComment = async () => {
    try {
      const newCommentsArray = [...userCommentsArray, newComment]; 
      const { data, error } = await supabase.from('Posts').update({
        usercomments: newCommentsArray,
        comments: post.comments + 1,
      }).eq('id', post.id);
  
      if (error) {
        throw error;
      }
  
      console.log('Comment posted:', data);
      setNewComment(''); 
      window.location.reload();
    } catch (error) {
      console.error('Error posting comment:', error.message);
    }
  };
  

  const openUpdateModal = () => {
    setUpdatedTitle(post.title);
    setUpdatedBody(post.body);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  return (
    <div className="post-container">
      <h4>Posted {calculateTimeAgo(post.timestamp)}</h4>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <img src={post.img} alt="Post Image" style={{ width: "300px", height: "auto" }} />
      <h4>{post.votes} 👍🏻</h4>
      <h5>
        By <span style={{ color: 'blue' }}>{post.user}</span>
      </h5>
      
    <div className="comment-container">
      {userCommentsArray.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
      {/* New comment input field */}
      <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
      {/* Post Comment button */}
      <button onClick={handlePostComment}>Post Comment</button>
    </div>

    <div className="ud-buttons">
      <button onClick={handleDelete}>Delete</button>
      <button onClick={openUpdateModal}>Update</button>
    </div>

    {/* Update Modal */}
    {updateModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeUpdateModal}>&times;</span>
          <h2>Update Post {post.id}</h2>
          <input type="text" placeholder="Title" value={updatedTitle} onChange={e => setUpdatedTitle(e.target.value)} className="modal-input" />
          <textarea placeholder="Body" value={updatedBody} onChange={e => setUpdatedBody(e.target.value)} className="modal-textarea" />
          <textarea placeholder="link" value={updatedLink} onChange={e => setUpdatedLink(e.target.value)} className="modal-textarea" />
          <button onClick={handleUpdate}>Submit</button>
        </div>
      </div>
    )}
  </div>
);
}

export default PostPage;
