import React, { useState } from 'react';
import '../design/BlogList.css';
// ... (other imports and component setup)

const Search = ({ blogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.body.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleButtonClick = () => {
    handleSearch(searchQuery);
  };

  return (
    <div>
      <div className='content-view'>
        <h2>Search Posts</h2>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
          />
          <button className="btn btn-info" onClick={handleButtonClick}>
            Search
          </button>
        </div>
      </div>

      <div>
        {searchQuery ? (
          <div>
            {searchResults.length > 0 ? (
              searchResults.map((blog, index) => (
                <div key={index} className="Post">
                  <h3>{blog.title}</h3>
                  <p>{blog.body}</p>
                  <p>Date: {new Date(blog.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        ) : (
          <p>Enter a search query to find posts.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
