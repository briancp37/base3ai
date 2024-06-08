import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../services/providers/AuthContext';
import './Navbar.css'; // Make sure to create a Navbar.css file for styling


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInDropdownOpen, setSignInIsDropdownOpen] = useState(false);

  const { user, handleSignOut, signInDivRef, loading } = useContext(AuthContext);


  const toggleSignInDropdown = () => {
    setSignInIsDropdownOpen(!isSignInDropdownOpen);
  };
  // console.log('user',user);
  // console.log('signInDivRef',signInDivRef);

  useEffect(() => {
    // if (Object.keys(user).length === 0 && signInDivRef.current) {
    if (user === null && signInDivRef.current) {
      signInDivRef.current.hidden = false;
    } else if (signInDivRef.current) {
      signInDivRef.current.hidden = true;
    }
  }, [user, signInDivRef]);

  // console.log('loading',loading);
  
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
                <a href="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=5768785">SSRN</a>
                <a href="https://github.com/briancp37">GitHub</a>
              </div>
            )}
          </div>
        </div>
        {/* <div><p>user: {user}</p></div> */}
        <div className="navbar-actions">
          {/* {!user || Object.keys(user).length === 0 ? ( */}
          { 
            loading ? (
              <p>Loading...</p>
            ) : 
            // Object.keys(user).length === 0 ? (
              // <div id="signInDiv"></div>
              user === null ? (
              <div>
                <div ref={signInDivRef} id="signInDiv"></div>
                {/* <div><p>3</p></div> */}
              </div>
            ) : (
              <div className="user-profile">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-picture"
                  onClick={toggleSignInDropdown}
                />
                {isSignInDropdownOpen && (
                  <div className="dropdown-menu">
                    <p>{user.name}</p>
                    <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
                  </div>
                )}
              </div>
            )
          }
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
