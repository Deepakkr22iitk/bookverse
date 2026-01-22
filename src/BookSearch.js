import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookSearch.css'; // Import existing styles

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  // Simulate fetching all books data on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    const sampleBooks = [
      {
        id: 101,
        title: 'Martial World',
        author: 'Cocooned Cow',
        cover: 'https://cdn.novelupdates.com/images/2018/04/Martial-World.jpg',
        genres: ['Action', 'Adventure', 'Fantasy', 'Martial Arts'],
        averageRating: 4.2
      },
      {
        id: 102,
        title: 'Star Gate',
        author: 'Tang Jia San Shao',
        cover: 'https://cdn.novelupdates.com/images/2023/12/Stargate.jpg',
        genres: ['Sci-Fi', 'Adventure', 'Mystery'],
        averageRating: 4.5
      },
      {
        id: 103,
        title: 'Etranger',
        author: 'Shin Yun',
        cover: 'https://cdn.novelupdates.com/images/2016/09/etranger.jpg',
        genres: ['Drama', 'Cultural', 'Slice of Life'],
        averageRating: 4.0
      },
      {
        id: 104,
        title: 'Gateway to Immortality',
        author: 'Liang Yue',
        cover: 'https://cdn.novelupdates.com/images/2024/12/Gateway-of-Immortality.jpg',
        genres: ['Fantasy', 'Cultivation', 'Mystery'],
        averageRating: 4.7
      },
      {
        id: 105,
        title: 'The Lost City',
        author: 'Maya Chen',
        cover: 'https://cdn.novelupdates.com/images/2024/01/lost-city.jpg',
        genres: ['Adventure', 'Mystery', 'Historical'],
        averageRating: 4.3
      },
      {
        id: 106,
        title: 'Eternal Night',
        author: 'R.J. Blackwood',
        cover: 'https://cdn.novelupdates.com/images/2024/02/eternal-night.jpg',
        genres: ['Horror', 'Supernatural', 'Mystery'],
        averageRating: 4.1
      },
      {
        id: 107,
        title: 'Whispers of the Heart',
        author: 'Sophia Lee',
        cover: 'https://cdn.novelupdates.com/images/2023/11/whispers.jpg',
        genres: ['Romance', 'Drama', 'Contemporary'],
        averageRating: 4.4
      },
      {
        id: 108,
        title: 'Cyber Dreams',
        author: 'Alex Morgan',
        cover: 'https://cdn.novelupdates.com/images/2024/03/cyber-dreams.jpg',
        genres: ['Sci-Fi', 'Cyberpunk', 'Action'],
        averageRating: 4.6
      }
    ];
    
    setAllBooks(sampleBooks);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    
    if (e.target.value.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      
      // Filter books based on search term
      const results = allBooks.filter(book => {
        const searchLower = e.target.value.toLowerCase();
        return (
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.genres.some(genre => genre.toLowerCase().includes(searchLower))
        );
      });
      
      setSearchResults(results);
    }
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(rating) ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Find Your Next Great Read</h2>
      </div>
      
      <div className="search-form">
        <input 
          type="text" 
          placeholder="Search by title, author or genre..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      {isSearching && (
        <div className="search-results">
          <h3>Search Results {searchResults.length > 0 ? `(${searchResults.length})` : ''}</h3>
          
          {searchResults.length === 0 ? (
            <div className="no-results">
              <p>No books found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="results-grid">
              {searchResults.map(book => (
                <div key={book.id} className="book-card">
                  <Link to={`/book/${book.id}`} className="book-link">
                    <div className="book-cover-container">
                      <img src={book.cover} alt={book.title} className="search-book-cover" />
                    </div>
                    <div className="book-info-container">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-author">by {book.author}</p>
                      <div className="book-rating-small">
                        {renderStars(book.averageRating)}
                        <span className="rating-value-small">{book.averageRating.toFixed(1)}</span>
                      </div>
                      <div className="book-genres-small">
                        {book.genres.slice(0, 3).map((genre, index) => (
                          <span key={index} className="genre-tag-small">{genre}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSearch;