import React from 'react';
import { Link } from 'react-router-dom';
import './ActionBooks.css'; // Import the CSS file

const ActionBooks = () => {
  return (
    <div className="genre-page">
      <h1>Action</h1>
      <p>A work typically depicting fighting, violence, chaos, and fast-paced motion.</p>
      
      <div className="book-list">
        <div className="book-item">
          <div className="book-cover">
            <img src="https://cdn.novelupdates.com/images/2018/04/Martial-World.jpg" alt="Martial World" className="book-pic" />
          </div>
          <h2>Martial World</h2>
          <button className="read-btn">Read</button>
        </div>
        
        <div className="book-item">
          <div className="book-cover">
            <img src="https://cdn.novelupdates.com/images/2023/12/Stargate.jpg" alt="Star Gate" className="book-pic" />
          </div>
          <h2>Star Gate</h2>
          <button className="read-btn">Read</button>
        </div>
        
        <div className="book-item">
          <div className="book-cover">
            <img src="https://cdn.novelupdates.com/images/2016/09/etranger.jpg" alt="Etranger" className="book-pic" />
          </div>
          <h2>Etranger</h2>
          <button className="read-btn">Read</button>
        </div>
      </div>

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default ActionBooks;