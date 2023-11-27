import React, { useState } from 'react';
import Pagination from './Pagination';
import { Button } from 'react-bootstrap';
import '../design/BlogList.css';

const BlogList = ({ blogs, dispatch }) => {
  const [updatedBlog, setUpdatedBlog] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(blogs.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleUpdate = (index) => {
    setUpdateMode(true);
    setCurrentIndex(index);
    setUpdatedBlog(blogs[index].body);
  };

  const handleUpdateConfirm = () => {
    if (currentIndex !== null) {
      const confirmed = window.confirm('Do you want to update this blog?');
      if (confirmed) {
        dispatch({ type: 'UPDATE_BLOG', payload: { index: currentIndex, updatedBlog } });
        setUpdatedBlog('');
        setUpdateMode(false);
        setCurrentIndex(null);
      }
    }
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm('Do you want to delete this blog?');
    if (confirmed) {
      dispatch({ type: 'DELETE_BLOG', payload: { index } });
    }
  };

  return (
    <div className='container'>
      <h2>Posts</h2>
      {!searchQuery && (
        <>
          <div className="row mt-6">
            {currentPosts.map((blog, index) => (
              <div key={index} className="col-md-6">
                <div className='Post mt-3'>
                  <h3>{blog.title}</h3>
                  <p>{blog.body}</p>
                  <p>Date: {new Date(blog.date).toLocaleDateString()}</p>
                  {updateMode && currentIndex === index && (
                    <div>
                      <textarea
                        value={updatedBlog}
                        onChange={(e) => setUpdatedBlog(e.target.value)}
                      />
                      <Button variant="success" onClick={handleUpdateConfirm}>
                        Confirm Update
                      </Button>
                    </div>
                  )}
                  {!updateMode && (
                    <div className='buttons'>
                      <Button
                        variant="warning"
                        onClick={() => handleUpdate(index)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Pagination
            totalPages={Math.ceil(blogs.length / postsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BlogList;
