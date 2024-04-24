import React, { useState } from 'react';
import './Navbar.css'; // Make sure to create a Navbar.css file for styling


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Branding */}
        <a href="/" className="navbar-brand">Base3AI</a>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="/chatgpt" className="navbar-link">Chat GPT</a>
          <a href="/llama3" className="navbar-link">Llamma 3</a>
          <a href="/base3gpt" className="navbar-link">Base 3 GPT</a>
          <a href="/travelgpt" className="navbar-link">TravelGPT</a>
          <a href="/optical-object-recognition" className="navbar-link">Image Recognition</a>
          <div className="navbar-item" 
               onMouseEnter={() => setIsDropdownOpen(true)}
               onMouseLeave={() => setIsDropdownOpen(false)}>
            <a href="/research" className="navbar-link">Research ▼</a>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <a href="/overview">Overview</a>
                <a href="/gpt4">GPT-4</a>
                <a href="/dalle3">DALL·E 3</a>
                <a href="/sora">Sora</a>
              </div>
            )}
          </div>

          {/* ... */}
        </div>

        {/* Right-aligned items */}
        <div className="navbar-actions">
          <a href="/about" className="navbar-action">About</a>
          <a href="/login" className="navbar-action">Log in</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;



// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <a href="/" className="navbar-logo">
//           OpenAI
//         </a>
//         {/* Navigation Links */}
//         <div className="nav-menu">
//           <div className="nav-item" onMouseEnter={() => setIsDropdownOpen(true)}
//                onMouseLeave={() => setIsDropdownOpen(false)}>
//             Research
//             {isDropdownOpen && (
//               <div className="dropdown-menu">
//                 <a href="/overview" className="dropdown-link">Overview</a>
//                 {/* Other dropdown links */}
//               </div>
//             )}
//           </div>
//           {/* Other nav items */}
//         </div>
//         {/* Right-aligned items */}
//         <div className="nav-right">
//           <a href="/search" className="nav-link">Search</a>
//           <a href="/login" className="nav-link">Log In</a>
//           <a href="/try" className="nav-link nav-link-special">Try ChatGPT</a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
