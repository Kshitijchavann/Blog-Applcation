import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Search from './components/Search';
import SinglePost from './components/SinglePost';
import useFetch from './hooks/useFetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPost } from './services/api';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload };
    case 'ADD_BLOG':
      const newBlog = {
        ...action.payload.blog,
        date: action.payload.blog.date || new Date().toISOString(),
      };
      const updatedBlogs = action.payload.position === 'first'
        ? [newBlog, ...state.blogs]
        : [...state.blogs, newBlog];

      return { ...state, blogs: updatedBlogs };
    case 'DELETE_BLOG':
      return { ...state, blogs: state.blogs.filter((_, index) => index !== action.payload.index) };
    case 'UPDATE_BLOG':
      const updatedBlogsForUpdate = state.blogs.map((blog, index) =>
        index === action.payload.index ? { ...blog, body: action.payload.updatedBlog } : blog
      );
      return { ...state, blogs: updatedBlogsForUpdate };
    case 'ADD_USER_BLOG':
      const newUserBlog = {
        title: action.payload.title,
        body: action.payload.body,
        date: new Date().toISOString(),
      };
      const updatedUserBlogs = [newUserBlog, ...state.blogs];
      return { ...state, blogs: updatedUserBlogs };
    default:
      return state;
  }
};

const App = () => {
  const { data: posts, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [state, dispatch] = useReducer(reducer, { blogs: [] });

  useEffect(() => {
    if (posts && Array.isArray(posts)) {
      const blogsWithDefaultDate = posts.map((post) => ({
        ...post,
        date: post.date || new Date().toISOString(),
      }));
      dispatch({ type: 'SET_BLOGS', payload: blogsWithDefaultDate });
    }
  }, [posts]);

  return (
    <Router>
      <div className="Task-Bar">
          <h1>Blogs & Explore</h1>
          <div className='Content'>
            <Link to="/">
              <button type='button' className="btn btn-secondary btn-lg">Home</button>
            </Link>
            <Link to="/add">
              <button type='button' className="btn btn-success btn-lg">Add</button>
            </Link>
            <Link to="/search">
              <button type='button' className="btn btn-info btn-lg">Search</button>
            </Link>
          </div>
        </div>
         <div className="body">
        <Routes>
          <Route path='/' element={<BlogList blogs={state.blogs} dispatch={dispatch} />} />
          <Route path='/add' element={<BlogForm dispatch={dispatch} />} />
          <Route path='/search' element={<Search blogs={state.blogs} />} />
          <Route path='/post/:id' element={<SinglePost blogs={state.blogs} dispatch={dispatch} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
