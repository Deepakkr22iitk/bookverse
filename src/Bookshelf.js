import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Bookshelf.css';

const Bookshelf = () => {
  // Sample initial data - in a real app, this would come from an API/database
  const [shelves, setShelves] = useState([
    {
      id: 1, 
      name: "Currently Reading",
      books: [
        { id: 101, title: "Martial World", author: "Cocooned Cow", cover: "https://cdn.novelupdates.com/images/2018/04/Martial-World.jpg", progress: 65 },
        { id: 102, title: "Star Gate", author: "Tang Jia San Shao", cover: "https://cdn.novelupdates.com/images/2023/12/Stargate.jpg", progress: 30 }
      ]
    },
    {
      id: 2,
      name: "Want to Read",
      books: [
        { id: 103, title: "Etranger", author: "Shin Yun", cover: "https://cdn.novelupdates.com/images/2016/09/etranger.jpg", progress: 0 }
      ]
    },
    {
      id: 3,
      name: "Finished",
      books: [
        { id: 104, title: "Gateway to Immortality", author: "Liang Yue", cover: "https://cdn.novelupdates.com/images/2024/12/Gateway-of-Immortality.jpg", progress: 100 }
      ]
    }
  ]);

  const [newShelfName, setNewShelfName] = useState("");
  const [isAddingShelf, setIsAddingShelf] = useState(false);
  
  // Create a new shelf
  const handleCreateShelf = () => {
    if (newShelfName.trim() === "") return;
    
    const newShelf = {
      id: Date.now(), // Simple way to generate unique IDs for demo
      name: newShelfName,
      books: []
    };
    
    setShelves([...shelves, newShelf]);
    setNewShelfName("");
    setIsAddingShelf(false);
  };
  
  // Delete a shelf
  const handleDeleteShelf = (shelfId) => {
    if (window.confirm("Are you sure you want to delete this shelf?")) {
      setShelves(shelves.filter(shelf => shelf.id !== shelfId));
    }
  };
  
  // Remove a book from a shelf
  const handleRemoveBook = (shelfId, bookId) => {
    setShelves(shelves.map(shelf => {
      if (shelf.id === shelfId) {
        return {
          ...shelf,
          books: shelf.books.filter(book => book.id !== bookId)
        };
      }
      return shelf;
    }));
  };
  
  // Update book progress
  const handleUpdateProgress = (shelfId, bookId, newProgress) => {
    setShelves(shelves.map(shelf => {
      if (shelf.id === shelfId) {
        return {
          ...shelf,
          books: shelf.books.map(book => {
            if (book.id === bookId) {
              return { ...book, progress: newProgress };
            }
            return book;
          })
        };
      }
      return shelf;
    }));
  };
  
  // Move a book to another shelf
  const handleMoveBook = (currentShelfId, bookId, targetShelfId) => {
    // Find the book to move
    let bookToMove = null;
    let updatedShelves = shelves.map(shelf => {
      if (shelf.id === currentShelfId) {
        const bookIndex = shelf.books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
          bookToMove = shelf.books[bookIndex];
          return {
            ...shelf,
            books: shelf.books.filter(book => book.id !== bookId)
          };
        }
      }
      return shelf;
    });
    
    // Add the book to the target shelf
    if (bookToMove) {
      updatedShelves = updatedShelves.map(shelf => {
        if (shelf.id === targetShelfId) {
          return {
            ...shelf,
            books: [...shelf.books, bookToMove]
          };
        }
        return shelf;
      });
    }
    
    setShelves(updatedShelves);
  };

  return (
    <div className="bookshelf-container">
      <h1>My Bookshelves</h1>
      
      <div className="shelf-actions">
        {isAddingShelf ? (
          <div className="add-shelf-form">
            <input
              type="text"
              value={newShelfName}
              onChange={(e) => setNewShelfName(e.target.value)}
              placeholder="Enter shelf name"
            />
            <button onClick={handleCreateShelf}>Create</button>
            <button onClick={() => setIsAddingShelf(false)}>Cancel</button>
          </div>
        ) : (
          <button className="add-shelf-btn" onClick={() => setIsAddingShelf(true)}>
            + Add New Shelf
          </button>
        )}
      </div>
      
      {shelves.map(shelf => (
        <div key={shelf.id} className="shelf">
          <div className="shelf-header">
            <h2>{shelf.name}</h2>
            <div className="shelf-controls">
              <button className="delete-shelf" onClick={() => handleDeleteShelf(shelf.id)}>
                Delete Shelf
              </button>
            </div>
          </div>
          
          {shelf.books.length === 0 ? (
            <p className="empty-shelf">No books in this shelf yet.</p>
          ) : (
            <div className="book-list">
              {shelf.books.map(book => (
                <div key={book.id} className="book-card">
                  <img src={book.cover} alt={book.title} className="book-cover" />
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    
                    <div className="progress-container">
                      <label>Reading Progress: {book.progress}%</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100"
                        value={book.progress}
                        onChange={(e) => handleUpdateProgress(shelf.id, book.id, parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="book-actions">
                      <select 
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            handleMoveBook(shelf.id, book.id, parseInt(e.target.value));
                            e.target.value = "";
                          }
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>Move to...</option>
                        {shelves
                          .filter(s => s.id !== shelf.id)
                          .map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))
                        }
                      </select>
                      
                      <button onClick={() => handleRemoveBook(shelf.id, book.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className="return-home">
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
};

export default Bookshelf;