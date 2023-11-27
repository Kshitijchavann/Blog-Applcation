import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../design/BlogForm.css';
const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

const BlogForm = ({ addBlog }) => {
  const navigate = useNavigate(); 
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newBlog = { blog: data };
    addBlog({ ...newBlog, position: 'first' });
    console.log('Blog post created successfully');
    reset();
    navigate('/'); 
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='Form'>
      <div className='form-content'>
        <div>
          <label>Title</label>
          <input type="text" {...register('title')} />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <label>Body</label>
          <textarea {...register('body')} />
          <p>{errors.body?.message}</p>
        </div>
        <div>
          <label>Date</label>
          <input type="text" value={new Date().toLocaleDateString()} readOnly />
        </div>
        <div>
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
