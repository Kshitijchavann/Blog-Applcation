import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../design/BlogList.css';

const BlogList = ({ blogs, dispatch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    console.log('BlogList component re-rendered');
  }, [blogs]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(blogs.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='container'>
      <h2>Posts</h2>
      <div className='row mt-6'>
        {currentPosts.map((blog, index) => (
          <Link to={`/post/${index}`} className='Post' key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
            <p>Date: {new Date(blog.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
      <Pagination
        totalPages={Math.ceil(blogs.length / postsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogList;
