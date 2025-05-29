import React, { useEffect, useState } from 'react';
import Weather from './Weather.jsx';
import Calender from './Calender.jsx';
import './News.css';
import userImg from '../assets/images/user.png';
import noImg from '../assets/images/no-img.png';
import axios from 'axios';
import NewsModel from './NewsModel.jsx';
import Bookmarks from './Bookmarks.jsx';
import BlogsModel from './BlogsModel.jsx';

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModel, setShowBookmarksModel] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogModel, setShowBlogModel] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {

    let url = `http://localhost:5000/api/news?category=${selectedCategory}`;

    if (searchQuery) {
        url = `http://localhost:5000/api/news?q=${searchQuery}`;
    }



      try {
        const response = await axios.get(url);
        const fetchedNews = response.data.articles;

        // Assign default image if missing
        fetchedNews.forEach(article => {
          if (!article.image) {
            article.image = noImg;
          }
        });

        setHeadline(fetchedNews[0] || null);
        setNews(fetchedNews.slice(1, 7));

        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(storedBookmarks);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput('');
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModel(true);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks(prevBookmarks => {
      const isBookmarked = prevBookmarks.find(b => b.title === article.title);
      const updatedBookmarks = isBookmarked
        ? prevBookmarks.filter(b => b.title !== article.title)
        : [...prevBookmarks, article];

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const handleBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogModel(true);
  };

  const closeBlogModel = () => {
    setShowBlogModel(false);
    setSelectedPost(null);
  };

  return (
    <div className='news'>
      <header className='news-header'>
        <h1 className='logo'>News & Blogs</h1>
        <div className='search-bar'>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Search News...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type='submit'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </form>
        </div>
      </header>
      <div className='news-content'>
        <div className='navbar'>
          <div className='user' onClick={onShowBlogs}>
            <img src={userImg} alt='User Image' />
            <p>Varsha's Blog</p>
          </div>
          <nav className='categories'>
            <h1 className='nav-headings'>Categories</h1>
            <div className='nav-links'>
              {categories.map((category) => (
                <a
                  href='#'
                  key={category}
                  className='nav-link'
                  onClick={(e) => handleCategoryChange(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href='#' className='nav-link' onClick={() => setShowBookmarksModel(true)}>
                Bookmarks <i className='fa-solid fa-bookmark'></i>
              </a>
            </div>
          </nav>
        </div>
        <div className='news-section'>
          {headline && (
            <div className='headline' onClick={() => handleArticleClick(headline)}>
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className='headline-title'>
                {headline.title}
                <i
                  className={`${
                    bookmarks.some((bookmark) => bookmark.title === headline.title)
                      ? 'fa-solid'
                      : 'fa-regular'
                  } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}
          <div className='news-grid'>
            {news.map((article, index) => (
              <div key={index} className='news-grid-item' onClick={() => handleArticleClick(article)}>
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`${
                      bookmarks.some((bookmark) => bookmark.title === article.title)
                        ? 'fa-solid'
                        : 'fa-regular'
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(article);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>

        <NewsModel show={showModel} article={selectedArticle} onClose={() => setShowModel(false)} />
        <Bookmarks
          show={showBookmarksModel}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModel(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />

        <div className='my-blogs'>
          <h1 className='my-blogs-heading'>My Blogs</h1>
          <div className='blog-posts'>
            {blogs.map((blog, index) => (
              <div key={index} className='blog-post' onClick={() => handleBlogClick(blog)}>
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>
                <div className='post-buttons'>
                  <button className='edit-post' onClick={() => onEditBlog(blog)}>
                    <i className='bx bxs-edit'></i>
                  </button>
                  <button
                    className='delete-post'
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlog(blog);
                    }}
                  >
                    <i className='bx bxs-x-circle'></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost && showBlogModel && (
            <BlogsModel show={showBlogModel} blog={selectedPost} onClose={closeBlogModel} />
          )}
        </div>

        <div className='weather-calender'>
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className='news-footer'>
        <p>
          <span>News & Blogs</span>
        </p>
        <p>&copy; 2025 Varsha. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default News;

