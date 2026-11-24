
import { useState } from 'react';
import {
  Menu,
  Home,
  MessageCircle,
  HandHeart,
  Sun,
  Moon,
  UserCircle,
  X
} from 'lucide-react';

import './Navbar.css';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      {/* Top navigation */}
      <header className="saintly-navbar">

        <button
          className="navbar-menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
        <div className="navbar-actions"> <button className="navbar-icon" aria-label="Help">
            <MessageCircle color="#88B0FF" />
          </button>

          <a href="/volunteer.html" className="navbar-icon" aria-label="Volunteer">
            <HandHeart color="#88B0FF" />
          </a>

          <button
            className="navbar-icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle brightness"
          >
            {darkMode ? <Moon color="#88B0FF" /> : <Sun color="#88B0FF"/>}
          </button>
</div>




        <a href="/" className="navbar-logo">
       <img src="/fullLogo.png" alt="Saintly" />
        </a>

        <div className="navbar-actions">

                   <a
            href="https://discord.gg/SuAvtn7595"
            className="navbar-discord"
          >
            Join Our Discord!
          </a>

          <button className="navbar-account"  onClick={() => {
    document.getElementById('accountPannel')?.classList.toggle('show');
  }}>
            <UserCircle size={19} />
            <span>Log In</span>
          </button>

        </div>
      </header>

      {/* Sidebar */}
      <aside className={`saintly-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/amc10adaptivepractice.html">Practice</a>
        <a href="/articles.html">Articles</a>
        <a href="/volunteer.html">Volunteer</a>
      </aside>

      {sidebarOpen && (
        <div
          className="navbar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
