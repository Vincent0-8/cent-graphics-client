import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";
import mainLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("saved-palettes"); // tambah ini
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/#">
          <img src={mainLogo} alt="main-logo" />
        </a>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        
        <li>
          <a href="/#">ABOUT</a>
        </li>
        <li>
          <a href="/#services">SERVICES</a>
        </li>
        <li>
          <a href="/#palettes">PALETTES</a>
        </li>
        <li>
          <a href="/#typography">TYPOGRAPHY</a>
        </li>
        <li>
          <a href="/#contact">CONTACT</a>
        </li>
        <li>
          <Link to="/collection">COLLECTION</Link>
        </li>
        {user ? (
    <>
        <li className="navbar-username">👤 {user.username}</li>
        <li onClick={handleLogout} style={{cursor: 'pointer'}}>LOGOUT</li>
    </>
) : (
    <li><Link to="/auth">LOGIN</Link></li>
)}
      </ul>
      <button className="navbar-menu-btn" onClick={toggleMenu}>
        <RxHamburgerMenu />
      </button>
    </nav>
  );
}

export default Navbar;
