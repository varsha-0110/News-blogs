import React from 'react'
import demoImg from '../assets/images/demo.jpg'
import './BlogsModel.css'

const BlogsModel = ({show, blog, onClose}) => {
    if(!show){
        return null
    }
  return (
    <div className = "model-overlay">
        <div className = "model-content">
            <span className = "close-button" onClick = {onClose}>
                <i className = "fa-solid fa-xmark"></i>
            </span>
            {blog.image && <img src = {blog.image} alt = {blog.title} className = "blogs-model-image"/>}
            <h2 className = "blogs-model-title">{blog.title}</h2>
            <p className = "blogs-post-content">{blog.content}</p>
        </div>
    </div>
  )
}
export default BlogsModel