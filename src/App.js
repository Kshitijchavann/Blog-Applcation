import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Search from './components/Search';
import useFetch from './hooks/useFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload.blogs };
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
    if (posts) {
      const blogsWithDefaultDate = posts.map((post) => ({
        ...post,
        date: post.date || new Date().toISOString(),
      }));
  
      dispatch({ type: 'SET_BLOGS', payload: { blogs: blogsWithDefaultDate } });
    }
  }, [posts]);

  return (
    <Router>
      <div className="body">
        <div className="Task-Bar">
          <h1>Blogs & Explore</h1>
          <div className='Content'>
            <Link to="/">
              <button type='button' className="btn btn-secondary">Home</button>
            </Link>
            <Link to="/add">
              <button type='button' className="btn btn-success">Add</button>
            </Link>
            <Link to="/search">
              <button type='button' className="btn btn-info">Search</button>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<BlogList blogs={state.blogs} dispatch={dispatch} />} />
          <Route path="/add" element={<BlogForm addBlog={dispatch} />} />
          <Route path="/search" element={<Search blogs={state.blogs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
