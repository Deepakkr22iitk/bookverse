import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookVerseHomepage from "./BookVerseHomepage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ActionBooks from './ActionBooks'
import Bookshelf from './Bookshelf';
import BookDetail from './BookDetail';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookVerseHomepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/action" element={<ActionBooks />} />
          <Route path="/my-shelves" element={<Bookshelf />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;