import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import book_img from './book_img.jpg';
import BookSearch from './BookSearch'; // Import the new search component

const BookVerseHomepage = () => {
  // Check if user is logged in - in a real app, this would use context or state management
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="home">
      <div className="topnav">
        <img src={book_img} alt="" className="book_img" />
        <Link to="/" className="heading"><b>BookVerse</b></Link>
        <Link className="active" to="/">Home</Link>

        <select className="dropdown" onChange={(e) => window.location.href = e.target.value}>
          <option value="" selected disabled>Novels</option>
          <option value="#popular">Popular</option>
          <option value="#latest-updates">Latest Updates</option>
          <option value="#trending">Trending</option>
        </select>

        <Link to="#Updates">Updates</Link>
        
        {/* Add search button */}
        <a href="#" onClick={(e) => {
          e.preventDefault();
          setShowSearch(!showSearch);
        }} className="search-nav-link">Search</a>
        
        {isLoggedIn ? (
          <>
            <Link to="/my-shelves">My Shelves</Link>

          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      
      {/* Search Component */}
      {showSearch && <BookSearch />}
      
      {/* Rest of your existing homepage code */}
      <div className="b1">
        <br /><br /><br /><br /><br />
        <div className="b2">
          <h1>A Library</h1>
          <h1>Reimagined</h1>
          <br />
          <pre>
            {"\t\t\t\tBookVerse is your digital library and community hub, connecting book lovers worldwide.\n\t\t\tShare reviews, rate books, and find like-minded readers to explore the literary universe together."}
          </pre>
        </div>
      </div>
      <br /><br />
      <h1>Popular Genres</h1>
      <br />
      <div className="genres">
        <Link to="/action">
          <div>
            <p><b>Action</b> <br />
              A work typically depicting fighting, violence, chaos, and fast-paced motion.
            </p>
          </div>
        </Link>
        <a href="#genre2">
          <div>
            <p><b>Fantasy</b> <br />
              Anything that involves, but not limited to, magic, dream world, and fairy tales.</p>
          </div>
        </a>
        <a href="#genre3">
          <div>
            <p><b>Comedy</b> <br />
              A dramatic work that is light and often humorous or satirical in tone and that usually contains a happy resolution of the
              thematic conflict.
            </p>
          </div>
        </a>
        <a href="#genre4">
          <div>
            <p><b>Romance</b> <br />
              A story in this genre focuses heavily on the romantic relationship between two or more people.
            </p>
          </div>
        </a>
        <a href="#genre5">
          <div>
            <p><b>Sci-fi</b> <br />
              Short for science fiction, these works involve twists on technology and other science-related phenomena which are
              contrary or stretches of the modern-day scientific world.
            </p>
          </div>
        </a>
      </div>
      <br /><br />

      <h1>Popular This Week</h1>
      <br /><br />
      <div className="popular" id="popular">
        <div>
          <Link to="/book/101">
            <img src="https://cdn.novelupdates.com/images/2018/04/Martial-World.jpg" alt="Martial World" className="book_pic" />
            <br />
            Martial World
          </Link>
        </div>
        <div>
          <Link to="/book/102">
            <img src="https://cdn.novelupdates.com/images/2023/12/Stargate.jpg" alt="Star Gate" className="book_pic" />
            <br />
            Star Gate
          </Link>
        </div>
        <div>
          <Link to="/book/103">
            <img src="https://cdn.novelupdates.com/images/2016/09/etranger.jpg" alt="Etranger" className="book_pic" />
            <br />
            Etranger
          </Link>
        </div>
        <div>
          <Link to="/book/104">
            <img src="https://cdn.novelupdates.com/images/2024/12/Gateway-of-Immortality.jpg" alt="Gateway to Immortality" className="book_pic" />
            <br />
            Gateway to Immortality
          </Link>
        </div>
      </div>
      <br /><br />

      <h1>About us</h1>
      <br /><br />
      <pre>
        {"\t\t\t\tBookVerse is a vibrant community for book lovers to discover, discuss, and share their favorite reads.\n\t\t\t\t Connect with like-minded readers, explore diverse genres, and find your next literary adventure.\n\t\t\t\t\tTogether, let's celebrate the magic of stories and the joy of reading!"}
      </pre>
      <br /><br />

      <div className="foot">
        <div className="f1">BookVerse</div>
        <div><Link to="#About us">About Us</Link></div>
        <div><Link to="#Announcements">Announcements</Link></div>
        <div><Link to="#Contact us">Contact Us</Link></div>
        <div><Link to="#Jobs">Jobs</Link></div>
        <div><hr /></div>
        <div><a>Copyright @BookVerse</a></div>
        <div><a>Terms of Service</a> · <a>Privacy Policy</a> · <a>Cookie Policy</a></div>
      </div>
    </div>
  );
};

export default BookVerseHomepage;