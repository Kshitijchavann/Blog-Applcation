import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async (page, limit) => {
  const response = await axios.get(API_URL, { params: { _page: page, _limit: limit } });
  return response.data;
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    console.log('Create Post Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  const response = await axios.put(`${API_URL}/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_URL}/${postId}`);
  return response.data;
};
