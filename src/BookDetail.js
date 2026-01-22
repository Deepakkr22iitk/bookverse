import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookDetail.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', username: '' });
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Simulate fetching data (in a real app, this would come from an API/database)
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      // In a real app, you would fetch the actual user data
      setCurrentUser({ id: 1, username: 'bookLover42' });
    }
    
    // Sample book data
    const sampleBooks = {
      '101': {
        id: 101,
        title: 'Martial World',
        author: 'Cocooned Cow',
        cover: 'https://cdn.novelupdates.com/images/2018/04/Martial-World.jpg',
        description: 'In the Realm of the Gods, countless legends fought over a mysterious cube. After it vanished into the void, they gave up. But a chance discovery by a young man named Lin Ming brought the cube back to light. In a vast realm where cultivation was the key to power, this young man had the potential to reach the pinnacle.',
        genres: ['Action', 'Adventure', 'Fantasy', 'Martial Arts'],
        averageRating: 4.2
      },
      '102': {
        id: 102,
        title: 'Star Gate',
        author: 'Tang Jia San Shao',
        cover: 'https://cdn.novelupdates.com/images/2023/12/Stargate.jpg',
        description: 'A mysterious structure connecting different worlds, the Star Gate offers untold opportunities and dangers for those brave enough to cross it. Follow the journey of explorers who venture through this cosmic doorway, discovering new civilizations and confronting ancient threats.',
        genres: ['Sci-Fi', 'Adventure', 'Mystery'],
        averageRating: 4.5
      },
      '103': {
        id: 103,
        title: 'Etranger',
        author: 'Shin Yun',
        cover: 'https://cdn.novelupdates.com/images/2016/09/etranger.jpg',
        description: 'A tale of a stranger in a foreign land, navigating cultural differences and finding their place in an unfamiliar world. This poignant story explores themes of identity, belonging, and the universal human experience across different societies.',
        genres: ['Drama', 'Cultural', 'Slice of Life'],
        averageRating: 4.0
      },
      '104': {
        id: 104,
        title: 'Gateway to Immortality',
        author: 'Liang Yue',
        cover: 'https://cdn.novelupdates.com/images/2024/12/Gateway-of-Immortality.jpg',
        description: 'A young alchemist discovers an ancient text revealing the secrets to eternal life. As he delves deeper into forbidden knowledge, he faces moral dilemmas and supernatural adversaries who would keep the gateway to immortality sealed forever.',
        genres: ['Fantasy', 'Cultivation', 'Mystery'],
        averageRating: 4.7
      }
    };
    
    // Sample reviews data
    const sampleReviews = {
      '101': [
        { id: 1, userId: 2, username: 'fantasy_reader', rating: 5, comment: 'Amazing worldbuilding and character development!', date: '2025-02-10' },
        { id: 2, userId: 3, username: 'novel_critic', rating: 3, comment: 'Decent story but pacing issues in the middle chapters.', date: '2025-02-15' },
      ],
      '102': [
        { id: 3, userId: 4, username: 'scifi_lover', rating: 5, comment: 'Mind-blowing concept and excellent execution!', date: '2025-03-05' },
      ],
      '103': [
        { id: 4, userId: 5, username: 'literary_soul', rating: 4, comment: 'Beautifully written with profound insights.', date: '2025-01-20' },
      ],
      '104': [
        { id: 5, userId: 2, username: 'fantasy_reader', rating: 5, comment: 'One of the best cultivation novels I\'ve ever read!', date: '2025-03-15' },
        { id: 6, userId: 6, username: 'book_explorer', rating: 4, comment: 'Fascinating premise with compelling characters.', date: '2025-03-18' },
      ]
    };
    
    // Set book data based on ID
    setBook(sampleBooks[bookId]);
    
    // Set reviews data based on book ID
    setReviews(sampleReviews[bookId] || []);
  }, [bookId]);
  
  // Handle adding a new review
  const handleAddReview = () => {
    if (newReview.comment.trim() === '' || (!isLoggedIn && newReview.username.trim() === '')) return;
    
    const review = {
      id: Date.now(),
      userId: isLoggedIn ? currentUser.id : null,
      username: isLoggedIn ? currentUser.username : newReview.username,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', username: '' });
    setIsAddingReview(false);
    
    // Update average rating - in a real app this would be handled server-side
    if (book) {
      const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0) + review.rating;
      const newAverage = totalRatings / (reviews.length + 1);
      setBook({ ...book, averageRating: newAverage });
    }
  };
  
  // Handle editing a review
  const handleEditReview = (reviewId) => {
    const reviewToEdit = reviews.find(r => r.id === reviewId);
    if (reviewToEdit && reviewToEdit.userId === currentUser?.id) {
      setNewReview({ 
        rating: reviewToEdit.rating, 
        comment: reviewToEdit.comment,
        username: reviewToEdit.username 
      });
      setEditingReviewId(reviewId);
      setIsAddingReview(true);
    }
  };
  
  // Handle saving edited review
  const handleSaveEdit = () => {
    if (newReview.comment.trim() === '') return;
    
    const updatedReviews = reviews.map(review => {
      if (review.id === editingReviewId) {
        return {
          ...review,
          rating: newReview.rating,
          comment: newReview.comment,
          date: `${review.date} (edited)`
        };
      }
      return review;
    });
    
    setReviews(updatedReviews);
    setNewReview({ rating: 5, comment: '', username: '' });
    setIsAddingReview(false);
    setEditingReviewId(null);
    
    // Update average rating
    if (book) {
      const totalRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
      const newAverage = totalRatings / updatedReviews.length;
      setBook({ ...book, averageRating: newAverage });
    }
  };
  
  // Handle deleting a review
  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete your review?')) {
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
      
      // Update average rating
      if (book && updatedReviews.length > 0) {
        const totalRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAverage = totalRatings / updatedReviews.length;
        setBook({ ...book, averageRating: newAverage });
      } else if (book) {
        // No reviews left
        setBook({ ...book, averageRating: 0 });
      }
    }
  };
  
  // Cancel adding/editing review
  const handleCancelReview = () => {
    setIsAddingReview(false);
    setEditingReviewId(null);
    setNewReview({ rating: 5, comment: '', username: '' });
  };
  
  // Check if user has already reviewed this book
  const hasUserReviewed = () => {
    return isLoggedIn && reviews.some(review => review.userId === currentUser?.id);
  };
  
  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Loading state
  if (!book) {
    return <div className="loading">Loading book details...</div>;
  }

  return (
    <div className="book-detail-container">
      <div className="book-header">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
      
      <div className="book-detail">
        <div className="book-cover">
          <img src={book.cover} alt={book.title} />
        </div>
        
        <div className="book-info">
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          
          <div className="book-rating">
            {renderStars(Math.round(book.averageRating))}
            <span className="rating-value">{book.averageRating.toFixed(1)}</span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
          
          <div className="book-genres">
            {book.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
          
          <div className="book-actions">
            {isLoggedIn && (
              <button 
                className="add-to-shelf-btn"
                onClick={() => alert('Add to shelf functionality would open here')}
              >
                Add to Shelf
              </button>
            )}
          </div>
          
          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
      
      <div className="book-reviews">
        <h2>Reviews</h2>
        
        <div className="review-form-toggle">
          {!isAddingReview ? (
            <button 
              onClick={() => setIsAddingReview(true)}
              className="write-review-btn"
            >
              {editingReviewId ? 'Edit Your Review' : 'Write a Review'}
            </button>
          ) : null}
        </div>
            
        {isAddingReview && (
          <div className="review-form">
            <h3>{editingReviewId ? 'Edit Your Review' : 'Write a Review'}</h3>
            
            {!isLoggedIn && (
              <div className="guest-name-input">
                <label>Your Name:</label>
                <input
                  type="text"
                  value={newReview.username}
                  onChange={(e) => setNewReview({...newReview, username: e.target.value})}
                  placeholder="Enter your name"
                />
              </div>
            )}
            
            <div className="rating-input">
              <label>Your Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={star <= newReview.rating ? 'star filled clickable' : 'star clickable'}
                    onClick={() => setNewReview({...newReview, rating: star})}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <div className="comment-input">
              <label>Your Review:</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Share your thoughts about this book..."
                rows="5"
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button 
                onClick={editingReviewId ? handleSaveEdit : handleAddReview}
                className="submit-review-btn"
              >
                {editingReviewId ? 'Save Changes' : 'Post Review'}
              </button>
              <button 
                onClick={handleCancelReview}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.username}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="review-content">
                  <p>{review.comment}</p>
                </div>
                
                {isLoggedIn && currentUser?.id === review.userId && (
                  <div className="review-actions">
                    <button 
                      onClick={() => handleEditReview(review.id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteReview(review.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;