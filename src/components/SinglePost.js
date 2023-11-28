import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import '../design/SinglePost.css';

const SinglePost = ({ blogs, dispatch }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPost, setCurrentPost] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const post = blogs.find((blog, index) => index.toString() === id);
    setCurrentPost(post);
    // Set the initial value of the textarea when the post changes
    setUpdatedBlog(post?.body || '');
  }, [blogs, id]);

  const handleUpdate = () => {
    if (currentPost) {
      const confirmed = window.confirm('Do you want to update this blog?');
      if (confirmed) {
        dispatch({ type: 'UPDATE_BLOG', payload: { index: parseInt(id, 10), updatedBlog } });
        setUpdatedBlog('');
        setUpdateMode(false);
      }
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Do you want to delete this blog?');
    if (confirmed) {
      dispatch({ type: 'DELETE_BLOG', payload: { index: parseInt(id, 10) } });
      navigate('/');
    }
  };

  return (
    <div className='container'>
      <h2>Post</h2>
      {currentPost && (
        <div className='Post'>
          <h3>{currentPost.title}</h3>
          <p>{currentPost.body}</p>
          <p>Date: {new Date(currentPost.date).toLocaleDateString()}</p>
          <div className='buttons'>
            <Button variant='warning' onClick={() => setUpdateMode(true)}>
              Update
            </Button>
            <Button variant='danger' onClick={handleDelete}>
              Delete
            </Button>
          </div>
          {updateMode && (
            <div>
              <textarea
                value={updatedBlog}
                onChange={(e) => setUpdatedBlog(e.target.value)}
              />
              <Button variant='success' onClick={handleUpdate}>
                Confirm Update
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SinglePost;
